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

      socket?.on('NewMessageNotification', ({ channelId, workspaceId, senderId }) => {
         const isCurrentChannel = channelId === currentChannelRef.current;
         const isNotSender = senderId !== auth?.user?._id;

         if (isCurrentChannel && isNotSender) {
            socket?.emit('MarkMessagesAsRead', { workspaceId, channelId }, (data) => {
               console.log('Successfully Mark message as read', data);
            });
         }
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
         socket.off('NewMessageReceived');
         socket.off('NewMessageNotification');
         socket.off('MarkMessagesAsRead');
      };
   }, [socket]);

   return <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>;
};

export default MessageContext;
