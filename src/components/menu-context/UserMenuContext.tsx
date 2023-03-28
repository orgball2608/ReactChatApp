import { UserOptions } from '../../utils/constants';
import { Dispatch, FC, SetStateAction } from 'react';
import { getUserSettingIcon } from '../../utils/helpers';
import { logoutUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

type Props ={
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export const UserMenuContext:FC<Props> = ({
                setVisible
                                          })=>{
    const navigate = useNavigate();
    type CustomIconProps = {
        action: string;
    };
    const CustomIcon: FC<CustomIconProps> = ({ action }) => {
        const { icon: MyIcon } = getUserSettingIcon(action);
        return <MyIcon />;
    };

    const handleUserAction = (action:string)=>{
        setVisible(false);
        switch (action){
            case 'setting':
                console.log('action');
                break;
            case 'logout':
                logoutUser().finally(() => {
                    navigate('/login');
                });
                break;
        }
    }

    return <div className="flex flex-col w-60 rounded-3xl justify-center cursor-pointer">
        {
            UserOptions.map((option)=>(
                <div
                    onClick={()=>handleUserAction(option.action)}
                    key={option.label}
                    className="text-white flex py-2 px-2 justify-start gap-3 text-base font-medium hover:bg-[#555454] rounded-md"
                >
                    <div className="p-[2px] rounded-full text-white bg-[#848889] flex justify-center items-center">
                        <CustomIcon action={option.action} />
                    </div>
                    <span className="text-lg">{option.label}</span>
                </div>
            ))
        }
    </div>
}