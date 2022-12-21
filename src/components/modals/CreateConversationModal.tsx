import React, {createRef, Dispatch, FC, useEffect} from "react";
import {MdClose} from "react-icons/md";
import {ModalContainer, ModalContentBody, ModalHeader} from "./index";
import {CreateConversationForm} from "../forms/CreateConversationForm";

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) =>
            e.key === 'Escape' && setShowModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleOverlayClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const { current } = ref;
        if (current === e.target) {
            console.log('Close Modal');
            setShowModal(false);
        }
    };

    return(
        <div className="w-full h-full bg-overlay-background fixed flex justify-center items-center z-10"
            onClick={handleOverlayClick}>
            <ModalContainer>
                <ModalHeader>
                    <h1 className="text-2xl font-bold ml-2">Create a conversation</h1>
                    <MdClose size={28} onClick={() => setShowModal(false)} />
                </ModalHeader>
                <ModalContentBody>
                    <CreateConversationForm />
                </ModalContentBody>
            </ModalContainer>
        </div>
    )
}