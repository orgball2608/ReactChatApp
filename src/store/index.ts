import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './coversationSlice';
import messageReducer from './messageSlice';
import typeReducer from './typeSlice';
import groupReducer from './groupSlice';
import groupMessageReducer from './groupMessageSlice';
import settingSidebarReducer from './settingSidebarSlice';
import selectedPageReducer from './selectedPageSlice';
import friendReducer from './friendSlice';
import callReducer from './callSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        messages: messageReducer,
        type: typeReducer,
        group: groupReducer,
        groupMessage: groupMessageReducer,
        settingSidebar: settingSidebarReducer,
        selectedPage: selectedPageReducer,
        friends: friendReducer,
        calls: callReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
