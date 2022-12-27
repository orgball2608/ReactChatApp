import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './coversationSlice';

const store = configureStore({
    reducer: {
        conversationReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
