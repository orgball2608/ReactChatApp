import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateGroupStickerMessageAPI, CreateStickerMessageAPI, GetStickers } from '../../services/api';
import { RootState } from '../../store';
import { StickerCollection } from '../../utils/types';
import { SpinLoading } from '../commons/SpinLoading';
import SpriteRenderer from './SpriteRenderer';

interface StickerPickerOpened {
    setVisible: Dispatch<SetStateAction<boolean>>;
}

const getRecentStickers = () => {
    const existing = localStorage.getItem('fireverse-recent-stickers') || '[]';
    try {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch (error) {
        return [];
    }
};

const StickerPicker: FC<StickerPickerOpened> = ({ setVisible }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<StickerCollection[]>([]);
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    useEffect(() => {
        GetStickers().then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, []);

    const [recentStickers, setRecentStickers] = useState(getRecentStickers());

    const addRecentSticker = (url: string) => {
        const added = [...new Set([url, ...recentStickers])];

        localStorage.setItem('fireverse-recent-stickers', JSON.stringify(added));

        setRecentStickers(added);
    };

    const handleCreateStickerMessage = (sticker: string) => {
        if (conversationType === 'group') {
            CreateGroupStickerMessageAPI({
                sticker,
                id: parseInt(id!),
            }).catch(()=>{
                setError(true)
            })
        } else {
            CreateStickerMessageAPI({
                sticker,
                id: parseInt(id!),
            }).catch(()=>{
                setError(true)
            })
        }
        setVisible(false);
    };

    return (
        <div className="border-dark-lighten absolute -left-16 bottom-full h-96 w-72 rounded-lg border-2 bg-[#222222] shadow-xl">
            {loading || error ? (
                <div className="flex h-full w-full items-center justify-center">
                    <SpinLoading />
                </div>
            ) : (
                <div className="flex h-full w-full flex-col">
                    <div className="flex-grow overflow-y-auto p-3 pt-1">
                        {recentStickers.length > 0 && (
                            <>
                                <h1 className="mt-2" id="sticker-recent">
                                    Recent stickers
                                </h1>
                                <div className="grid w-full grid-cols-4 justify-between">
                                    {recentStickers.map((url) => (
                                        <SpriteRenderer
                                            size={60}
                                            key={url}
                                            onClick={() => {
                                                addRecentSticker(url);
                                                handleCreateStickerMessage(url);
                                            }}
                                            className="hover:bg-dark-lighten cursor-pointer"
                                            src={url}
                                            runOnHover
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {data?.map((collection) => (
                            <Fragment key={collection.id}>
                                <h1 className="mt-2" id={`sticker-${collection.id}`}>
                                    {collection.name}
                                </h1>
                                <div className="grid w-full grid-cols-4 justify-between">
                                    {collection.stickers.map((sticker) => (
                                        <SpriteRenderer
                                            key={sticker.spriteURL}
                                            size={60}
                                            onClick={() => {
                                                handleCreateStickerMessage(sticker.spriteURL);
                                                addRecentSticker(sticker.spriteURL);
                                            }}
                                            className="hover:bg-dark-lighten cursor-pointer"
                                            src={sticker.spriteURL}
                                            runOnHover
                                        />
                                    ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="h-18 border-t-dark-lighten flex w-full flex-shrink-0 gap-2 overflow-x-auto border-t p-2">
                        {recentStickers.length > 0 && (
                            <button
                                onClick={() => document.querySelector(`#sticker-recent`)?.scrollIntoView()}
                                className="flex h-9 w-9 items-center"
                            >
                                <i className="bx bx-time text-[26px] leading-[26px]"></i>
                            </button>
                        )}
                        {data?.map((collection) => (
                            <img
                                key={collection.id}
                                onClick={() => document.querySelector(`#sticker-${collection.id}`)?.scrollIntoView()}
                                className="h-9 w-9 cursor-pointer object-cover"
                                src={collection.icon}
                                alt=""
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StickerPicker;
