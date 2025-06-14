import combineContext from '@/utils/combineContext';
import { MessageContextProvider } from './MessageContext';
import { RoomContextProvider } from './RoomContext';
import { SocketConnectionProvider } from './SocketConnectionContext';
import { TypingContextProvider } from './TypingContext';

export const SocketContextProvider = combineContext(
   SocketConnectionProvider,
   RoomContextProvider,
   TypingContextProvider,
   MessageContextProvider
);
