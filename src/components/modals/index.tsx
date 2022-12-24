import { FC, PropsWithChildren } from 'react';

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
    return <header className="w-100 px-6 box-border flex justify-between items-center mt-6">{children}</header>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
    return <div className="px-8 pb-8 pt-4">{children}</div>;
};

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
    return <div className="bg-modal-background w-[650px] box-border rounded-lg">{children}</div>;
};
