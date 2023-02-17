import { FC } from 'react';
import { GroupMessageType, MessageType } from '../../utils/types';
import { REACTIONS_UI } from '../../utils/constants';

type Props = {
    message: MessageType | GroupMessageType;
};

const ReactionStatus: FC<Props> = ({ message }) => {
    const { reacts } = message;
    const getIcon = (key: string) => {
        return REACTIONS_UI[key]?.icon;
    };
    return (
        <div
            className={`absolute top-full -translate-y-1/2 right-0 bg-dark-lighten px-1 rounded-lg py-[1px] text-xs flex items-center gap-[2px] border border-dark-lighten bg-dark-light cursor-pointer
      `}
        >
            {reacts?.map((react) => (
                <div key={react.id} className={`flex items-center gap-[2px]`}>
                    <img className="w-3 h-3" src={getIcon(react.type)} alt="" />
                </div>
            ))}

            {reacts?.length > 0 && <p>{reacts?.length}</p>}
        </div>
    );
};

export default ReactionStatus;
