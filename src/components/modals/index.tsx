import { FC, PropsWithChildren } from 'react';

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
    return <header className="w-full px-4 box-border flex justify-between items-center mt-6">{children}</header>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
    return <div className="px-6 pb-6 pt-2">{children}</div>;
};

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
    return <div className="bg-modal-background w-4/12 box-border rounded-xl">{children}</div>;
};
