import { FC, PropsWithChildren } from 'react';

export const MessagePanelBody: FC<PropsWithChildren> = ({ children }) => {
    return <div className="h-full flex flex-col p-6 box-border">{children}</div>;
};
