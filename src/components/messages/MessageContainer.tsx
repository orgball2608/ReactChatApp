import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contex/AuthContext';
import { FormattedMessage } from './FormatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useLocation, useParams } from 'react-router-dom';
import { Conversation, Group, GroupMessageType, MessageType } from '../../utils/types';
import { MessageMenuContext } from '../../contex/MessageMenuContext';
import { changeType } from '../../store/typeSlice';
import { MessageItem } from './MessageItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SpinLoading } from '../commons/SpinLoading';
import { loadMoreMessagesThunk } from '../../store/messageSlice';
import { loadMoreGroupMessagesThunk } from '../../store/groupMessageSlice';
import {
    GetConversationMessagesLength,
    GetGroupMessagesLength,
    UpdateSeenGroupMessage,
    UpdateSeenMessage,
} from '../../services/api';
import { ForwardMessageModal } from '../modals/ForwardMessageModal';
import { getLastSeenMessage } from '../../utils/helpers';

type Props = {
    setReplyInfo: React.Dispatch<React.SetStateAction<MessageType | GroupMessageType | undefined>>;
    inputSectionOffset: number;
};

export const MessageContainer: FC<Props> = ({ setReplyInfo, inputSectionOffset }) => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = conversations.find((conversation: Conversation) => conversation.id === parseInt(id!));
    const groups = useSelector((state: RootState) => state.group.groups);
    const selectedGroup = groups.find((group: Group) => group.id === parseInt(id!));
    const conversationMessages = useSelector((state: RootState) => state.messages.messages);
    const [editMessage, setEditMessage] = useState<MessageType | GroupMessageType | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const selectedType = useSelector((state: RootState) => state.type.type);
    const groupMessages = useSelector((state: RootState) => state.groupMessage.messages);
    const [limitCount, setLimitCount] = useState(0);
    const [messageLength, setMessageLength] = useState(0);
    const [groupMessageLength, setGroupMessageLength] = useState(0);
    const scrollRef = useRef<InfiniteScroll>(null);
    const [isForwarding, setIsForwarding] = useState<boolean>(false);
    const [forwardMessage, setForwardMessage] = useState<MessageType | GroupMessageType | null>(null);

    useEffect(() => {
        setIsEditing(false);
        setEditMessage(null);
        setLimitCount(0);
        setMessageLength(0);
        setGroupMessageLength(0);
    }, [id, selectedType]);

    useEffect(() => {
        if (selectedType === 'private') {
            GetConversationMessagesLength(parseInt(id!)).then((res) => {
                setMessageLength(res.data);
            });
        } else {
            GetGroupMessagesLength(parseInt(id!)).then((res) => {
                setGroupMessageLength(res.data);
            });
        }
    }, [selectedType, id]);

    useEffect(() => {
        if (selectedType === 'private')
            dispatch(loadMoreMessagesThunk({ id: parseInt(id!), limit: 10, offset: limitCount }));
        else dispatch(loadMoreGroupMessagesThunk({ id: parseInt(id!), limit: 10, offset: limitCount }));
    }, [limitCount, id,selectedType,dispatch]);

    const handleSubmit = (event: React.KeyboardEvent<HTMLImageElement>) => {
        if (event.key === 'Escape') setIsEditing(false);
    };

    const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editMessage) return;
        setEditMessage(
            (prev) =>
                prev && {
                    ...prev,
                    content: e.target.value,
                },
        );
    };

    const conversationPathNameType = pathname.split('/')[1];
    if (selectedType === 'private' && conversationPathNameType === 'groups') dispatch(changeType('group'));

    const msgs =
        selectedType === 'private'
            ? conversationMessages.find((cm) => cm.id === parseInt(id!))
            : groupMessages.find((gm) => gm.id === parseInt(id!));

    const messages = msgs?.messages || [];

    const lastSeenMessages: MessageType[]| GroupMessageType[] = []

    const updateSeenStatus = () => {
        if(messages.length===0) return;
        const lastMessage = messages[0];
        if(!lastMessage) return;
        if(selectedType==='private'){
            UpdateSeenMessage({ id: parseInt(id!), messageId: lastMessage.id });
            lastSeenMessages.push(getLastSeenMessage(messages,selectedConversation?.creator!)!)
            lastSeenMessages.push(getLastSeenMessage(messages,selectedConversation?.recipient!)!)
        } else {
            UpdateSeenGroupMessage({ id: parseInt(id!), messageId: lastMessage.id });
            selectedGroup && selectedGroup.users.map((user)=>{
                lastSeenMessages.push(getLastSeenMessage(messages,user)!)
            });
        }
    };


    useEffect(()=>{
        updateSeenStatus();
    },[conversationMessages,groupMessages])

    const getMessagesLength = () => {
        if (selectedType === 'private') return messageLength;
        else return groupMessageLength;
    };

    const formatMessages = () => {
        if (!msgs) return [];
        return msgs?.messages.map((m, index, arr) => {
            const nextIndex = index + 1;
            const currentMessage = arr[index];
            const prevIndex = nextIndex - 2;
            const prevMessage = arr[prevIndex];
            const nextMessage = arr[nextIndex];
            if (arr.length === nextIndex || currentMessage.author.id !== nextMessage.author.id) {
                return (
                        <FormattedMessage
                            user={user}
                            message={m}
                            key={m.id}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            onEditMessageChange={onEditMessageChange}
                            isOneElement={currentMessage.author.id !== prevMessage?.author.id}
                            setReplyInfo={setReplyInfo}
                        />
                );
            }
            if (currentMessage.author.id === nextMessage.author.id) {
                return (
                    <MessageItem
                        m={m}
                        key={m.id}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onEditMessageChange={onEditMessageChange}
                        currentMessage={currentMessage}
                        prevMessage={prevMessage}
                        index={index}
                        setReplyInfo={setReplyInfo}
                    />
                );
            }

            return (
                <FormattedMessage
                    user={user}
                    message={m}
                    key={m.id}
                    isEditing={isEditing}
                    onEditMessageChange={onEditMessageChange}
                    setIsEditing={setIsEditing}
                    setReplyInfo={setReplyInfo}
                />
            );
        });
    };

    return (
        <MessageMenuContext.Provider
            value={{
                editMessage: editMessage,
                setEditMessage: setEditMessage,
                isForwarding: isForwarding,
                setIsForwarding: setIsForwarding,
                forwardMessage: forwardMessage,
                setForwardMessage: setForwardMessage,
            }}
        >
            {isForwarding && <ForwardMessageModal setShowModal={setIsForwarding} />}
            <div id="scrollableDiv" className="h-full box-border relative outline-none" onKeyDown={handleSubmit} tabIndex={0}>
                <InfiniteScroll
                    dataLength={messages?.length as number}
                    next={() => {
                        setLimitCount((prev) => prev + 10);
                    }}
                    inverse={true}
                    hasMore={getMessagesLength() > limitCount && getMessagesLength() > 10}
                    loader={
                        <div className="flex justify-center py-16">
                            <SpinLoading />
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        padding: '0.5rem  1.5rem ',
                        gap: '0.25rem',
                        outline: 'none',
                    }}
                    height={`calc(100vh - ${124 + inputSectionOffset * 16}px)`}
                    ref={scrollRef}
                >
                    <>{formatMessages()}</>
                </InfiniteScroll>
            </div>
        </MessageMenuContext.Provider>
    );
};
