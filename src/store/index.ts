import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './coversationSlice';
import messageReducer from './messageSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        messages: messageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
