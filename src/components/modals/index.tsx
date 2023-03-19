import { FC, PropsWithChildren } from 'react';
import { useCurrentViewportView } from '../../hooks/useCurrentViewportView';


export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile } = useCurrentViewportView();
    return <header className={`w-full box-border flex justify-between items-center mt-6 ${isMobile ?'px-2':'px-6'}`}>{children}</header>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile } = useCurrentViewportView();
    return <div className={`pb-6 pt-2 ${isMobile ?'px-2':'px-6'}`}>{children}</div>;
};

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile } = useCurrentViewportView();
    return <div className={`bg-modal-background w-screen max-w-[550px] box-border rounded-xl flex flex-col gap-1 ${isMobile ?'mx-3':''}`}>{children}</div>;
};
