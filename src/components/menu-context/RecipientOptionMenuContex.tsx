import { FC } from 'react';
import { userContextMenuItems } from '../../utils/constants';
import { getUserContextMenuIcon } from '../../utils/helpers';
import { ContextMenuItemType, UserContextMenuItemType } from '../../utils/types';
export const RecipientOptionMenuContext = () => {
    type CustomIconProps = {
        action: UserContextMenuItemType;
    };
    const CustomIcon: FC<CustomIconProps> = ({ action }) => {
        const { icon: MyIcon } = getUserContextMenuIcon(action);
        return <MyIcon size={26} />;
    };

    return (
        <div className={` box-border w-60 px-1 py-2 rounded-3xl`}>
            <div className="flex flex-col justify-center gap-4">
                {userContextMenuItems.map((item: ContextMenuItemType) => (
                    <div key={item.label} className="text-white flex justify-start gap-4 text-base hover:bg-[white] ">
                        <div className="">
                            <CustomIcon action={item.action} />
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
