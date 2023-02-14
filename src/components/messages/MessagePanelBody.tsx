import { FC, PropsWithChildren } from 'react';

export const MessagePanelBody: FC<PropsWithChildren> = ({ children }) => {
    return <div className="h-full flex flex-col px-6 pt-6 pb-4 box-border">{children}</div>;
};
