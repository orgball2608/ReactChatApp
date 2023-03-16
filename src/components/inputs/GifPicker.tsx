import { Search } from 'akar-icons';
import { Dispatch, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { CreateGifMessageAPI, CreateGroupGifMessageAPI, getTrendingGiphy, searchGiphy } from '../../services/api';
import { RootState } from '../../store';
import { SpinLoading } from '../commons/SpinLoading';

type Props = {
    setVisible: Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
};

export const GifPicker: FC<Props> = ({ setVisible, visible }) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [GifPickerData, setGifPickerData] = useState<any>([]);
    const [isSearching, setIsSearching] = useState(false);
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);

    const debouncedSearchTerm = useDebounce(searchInputValue, 500);

    useEffect(() => {
        setGifPickerData([]);
        setSearchInputValue('');
    }, [visible]);

    useEffect(() => {
        if (searchInputValue === '') {
            getTrendingGiphy()
                .then((res) => {
                    setGifPickerData(res.data.data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsSearching(false));
        }
        if (debouncedSearchTerm) {
            setIsSearching(true);

            searchGiphy(searchInputValue)
                .then((res) => {
                    setGifPickerData(res.data.data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsSearching(false));
        }
    }, [debouncedSearchTerm]);

    const handleSendGif = (gif: string) => {
        if (conversationType === 'group') {
            CreateGroupGifMessageAPI({
                id: parseInt(id!),
                gif,
            });
        } else {
            CreateGifMessageAPI({
                id: parseInt(id!),
                gif,
            });
        }
        setVisible(false);
    };

    return (
        <div className=" border-dark-lighten border-1 shadow-2xl rounded-lg w-72 h-96 flex flex-col items-stretch">
            <div className="relative w-60 h-9 rounded-full mt-2 mx-auto flex-none">
                <Search className="absolute top-1/2 -translate-y-1/2 left-3" size={18} />
                <input
                    type="text"
                    value={searchInputValue}
                    placeholder="Search..."
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    className="w-full h-full pl-8 pr-4 rounded-full outline-none text-white bg-[#202020]"
                />
            </div>
            {isSearching ? (
                <div className="flex justify-center items-center w-full h-full">
                    <SpinLoading />
                </div>
            ) : (
                <div className="overflow-y-auto flex flex-wrap justify-center mt-3">
                    {GifPickerData.map((item: any) => (
                        <img
                            onClick={() => handleSendGif(item?.images?.original?.url)}
                            key={item.id}
                            src={item?.images?.original?.url}
                            className="h-[140px] object-cover cursor-pointer"
                            alt="giphy"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
