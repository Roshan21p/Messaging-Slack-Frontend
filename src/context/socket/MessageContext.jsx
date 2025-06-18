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
   const { currentChannelRef, currentDmRef } = useRoom();
   const { updateChannelUnreadCount, updateDmUnreadCount } = useMessageStatus();
   const { messageList, setMessageList } = useChannelMessages();

   useEffect(() => {
      if (!socket) return;

      socket?.on('NewMessageReceived', (data) => {
         setMessageList((prev) => [...prev, data]);

         console.log('new message', data);
      });

      socket?.on('NewMessageNotification', ({ channelId, roomId, workspaceId, senderId }) => {
         const isCurrentChannel =
            channelId && currentChannelRef.current && channelId === currentChannelRef.current;
         const isCurrentDmRoom = roomId && currentDmRef.current && roomId === currentDmRef.current;
         const isNotSender = senderId !== auth?.user?._id;

         if ((isCurrentChannel || isCurrentDmRoom) && isNotSender) {
            socket?.emit('MarkMessagesAsRead', { workspaceId, channelId, roomId }, (data) => {
               console.log('Successfully Mark message as read', data);
            });
         }
         console.log(
            'NewMessageNotification',
            'channelId',
            channelId,
            'workspaceId',
            workspaceId,
            'currentChannel',
            currentChannelRef.current,
            'roomId',
            roomId,
            'currentDmRef',
            currentDmRef.current
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

         if (roomId && roomId !== currentDmRef.current) {
            console.log(
               'newMessageNotification call back',
               roomId,
               'currentDmRef',
               currentDmRef.current
            );

            updateDmUnreadCount(roomId);
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
