import { useRoom } from '@/hooks/context/socket/useRoom';
import { useSocketConnection } from '@/hooks/context/socket/useSocketConnection';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useMessageStatus } from '@/hooks/context/useMessageStatus';
import { createContext, useEffect } from 'react';

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
   const { socket } = useSocketConnection();
   const { auth } = useAuth();
   const { currentChannelRef } = useRoom();
   const { updateChannelUnreadCount } = useMessageStatus();
   const { messageList, setMessageList } = useChannelMessages();

   useEffect(() => {
      if (!socket) return;

      socket?.on('NewMessageReceived', (data) => {
         setMessageList((prev) => [...prev, data]);
         console.log('new message', data);
      });

      socket?.on('NewMessageNotification', ({ channelId, workspaceId }) => {
         console.log(
            'NewMessageNotification',
            channelId,
            'workspaceId',
            workspaceId,
            'currentChannel',
            currentChannelRef.current
         );

         if (channelId && channelId !== currentChannelRef.current) {
            console.log(
               'newMessageNotification call back',
               channelId,
               'currentChannel',
               currentChannelRef.current
            );

            updateChannelUnreadCount(channelId);
         }
      });

      return () => {
         socket.off('newMessageReceived');
         socket.off('newNotificationReceived');
      };
   }, [socket]);

   return <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>;
};

export default MessageContext;
