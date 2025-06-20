import { AuthContextProvider } from './AuthContext';
import { ChannelMessagesProvider } from './ChannelMessages';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { MessageStatusContextProvider } from './MessageStatusContext';
import { SocketContextProvider } from './socket/SocketContextProvider';
import { WorkspaceContextProvider } from './WorkspaceContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';

import combineContext from '@/utils/combineContext';

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
