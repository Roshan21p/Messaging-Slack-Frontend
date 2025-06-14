import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { WorkspaceContextProvider } from './WorkspaceContext';
import { ChannelMessagesProvider } from './ChannelMessages';
import { MessageStatusContextProvider } from './MessageStatusContext';
import { SocketContextProvider } from './socket/SocketContextProvider';

export const AppContextProvider = combineContext(
   AuthContextProvider,
   ChannelMessagesProvider,
   WorkspaceContextProvider,
   MessageStatusContextProvider,
   // SocketContextProvider,
   SocketContextProvider,
   CreateWorkspaceContextProvider,
   WorkspacePreferencesModalContextProvider,
   CreateChannelContextProvider
);
