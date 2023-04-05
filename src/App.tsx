import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ConversationChannelPage } from './pages/conversation/ConversationChanelPage';
import { ConversationPage } from './pages/conversation/ConversationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { AuthContext } from './contex/AuthContext';
import React, { PropsWithChildren, useState } from 'react';
import { User } from './utils/types';
import { socket, SocketContext } from './contex/SocketContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Socket } from 'socket.io-client';
import { enableMapSet } from 'immer';
import { GroupPage } from './pages/group/GroupPage';
import { GroupChannelPage } from './pages/group/GroupChanelPage';
import { AppPage } from './pages/AppPage';
import SettingPage from './pages/SettingPage';
import { FriendPageLayout } from './pages/friend/FriendPageLayout';
import { ProfilePage } from './pages/friend/ProfilePage';
import LandingPage from './pages/LandingPage';

enableMapSet();

type Props = {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    socket: Socket;
};

function AppWithProviders({ children, user, setUser }: PropsWithChildren & Props) {
    return (
        <ReduxProvider store={store}>
            <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
                <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
            </AuthContext.Provider>
        </ReduxProvider>
    );
}

function App() {
    const [user, setUser] = useState<User>();
    return (
        <AppWithProviders user={user} setUser={setUser} socket={socket}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    element={
                        <AuthenticatedRoute>
                            <AppPage />
                        </AuthenticatedRoute>
                    }
                >
                    <Route path="/conversations/" element={<ConversationPage />}>
                        <Route path="/conversations/:id" element={<ConversationChannelPage />} />
                    </Route>
                    <Route path="/groups/" element={<GroupPage />}>
                        <Route path="/groups/:id" element={<GroupChannelPage />} />
                    </Route>

                    <Route path="/settings" element={<SettingPage />}></Route>
                    <Route path="/calls" element={<SettingPage />}></Route>
                    <Route path="/archives" element={<SettingPage />}></Route>
                    <Route path="/friends" element={<FriendPageLayout />}>
                        <Route path="/friends/profile/:id" element={<ProfilePage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppWithProviders>
    );
}

export default App;
