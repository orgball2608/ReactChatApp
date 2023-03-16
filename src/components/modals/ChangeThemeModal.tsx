import { Dispatch, FC, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChangeConversationTheme, ChangeGroupTheme } from '../../services/api';
import { RootState } from '../../store';
import { THEMES } from '../../utils/constants';

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const ChangeThemeModal:FC<Props>= ({
    setShowModal
}) => {
    const { id } = useParams<{ id: string }>();
    const conversationType = useSelector((state: RootState) => state.type.type);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation) => conversation.id === parseInt(id!));
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group) => group.id === parseInt(id!));

    const  getTheme = () => { 
        if (conversationType === 'private') {
            if (selectedConversation?.theme) {
                return selectedConversation.theme;
            }
        } else {
            if (selectedGroup?.theme) {
                return selectedGroup.theme;
            }
        }
    }


    const handleThemeChange = (theme: string) => {
        if (conversationType === 'private') {
          ChangeConversationTheme({
            id: parseInt(id!),
            theme: theme,
          });
        } else {
          ChangeGroupTheme({
            id: parseInt(id!),
            theme: theme,
          });
        }
    }


    return (<div
    className="w-full h-full bg-overlay-background fixed left-0 top-0 flex justify-center items-center z-50 animate-fade-in"
    tabIndex={-1}
    >
        <div className="bg-modal-background w-screen max-w-[500px] box-border rounded-lg overflow-hidden h-fit ">
            <div className="  box-border flex justify-center flex-shrink-0 items-center px-4 py-3 border-b-[1px] border-border-conversations">
                <div className="mr-auto invisible">
                    <MdClose size={24} className="bg-[#908f8f] cursor-pointer rounded-full" />
                </div>
                <span className="text-2xl">Change theme</span>
                <div className="ml-auto bg-[#383636] hover:bg-[#494747] p-1 rounded-full ">
                    <MdClose size={20} onClick={() => setShowModal(false)} className="cursor-pointer " />
                </div>
            </div>
            <div className="flex gap-3 flex-wrap p-4">
              {THEMES.map((theme) => (
                <div
                  key={theme}
                  style={{ background: theme }}
                  onClick={() => handleThemeChange(theme)}
                  className={`w-20 h-20 rounded-full cursor-pointer ${
                    getTheme() === theme ? "check-overlay" : ""
                  }`}
                ></div>
              ))}
            </div>
        
        </div>
        
    </div>)
}