import { useGetUnreadMessageCount } from '@/hooks/apis/MessageStatus/useGetUnreadMessageCount';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { createContext, useEffect, useState } from 'react';

const MessageStatusContext = createContext();

export const MessageStatusContextProvider = ({ children }) => {
   const { currentWorkspace } = useCurrentWorkspace();
   const workspaceId = currentWorkspace?._id;

   const { unreadMessageCount: apiUnreadCount, isSuccess } = useGetUnreadMessageCount(workspaceId);

   const [unreadMessageCount, setUnreadMessageCount] = useState([]);
   const [dmUnreadMessageCount, setDmUnreadMessageCount] = useState([]);

   console.log('apiUnreadCount', apiUnreadCount);

   // Set initial unread message count from API
   useEffect(() => {
      if (isSuccess && apiUnreadCount) {
         setUnreadMessageCount(apiUnreadCount.channels); // store only channels here
         setDmUnreadMessageCount(apiUnreadCount.dms);
         console.log('Updated unreadMessageCount:', apiUnreadCount);
      }
   }, [isSuccess, apiUnreadCount]);

   console.log('unreadMessageCount in message status', unreadMessageCount);

   // for channel
   const updateChannelUnreadCount = (channelId) => {
      setUnreadMessageCount((prev) => {
         const existing = prev.find((item) => item.channelId?._id === channelId);

         if (existing) {
            return prev.map((item) =>
               item.channelId?._id === channelId
                  ? { ...item, unreadCount: item.unreadCount + 1 }
                  : item
            );
         }
      });
   };

   const resetChannelUnreadCount = (channelId) => {
      console.log('Resetting unread for channel:', channelId);
      setUnreadMessageCount((prev) =>
         prev.map((item) =>
            item.channelId?._id === channelId ? { ...item, unreadCount: 0 } : item
         )
      );
   };

   // for dm
   const updateDmUnreadCount = (roomId) => {
      setDmUnreadMessageCount((prev) => {
         const existing = prev.find((item) => item?.roomId === roomId);

         if (existing) {
            return prev.map((item) =>
               item?.roomId === roomId ? { ...item, unreadCount: item.unreadCount + 1 } : item
            );
         }
      });
   };

   const resetDmUnreadCount = (roomId) => {
      setDmUnreadMessageCount((prev) =>
         prev.map((item) => (item.roomId === roomId ? { ...item, unreadCount: 0 } : item))
      );
   };

   return (
      <MessageStatusContext.Provider
         value={{
            unreadMessageCount,
            updateChannelUnreadCount,
            resetChannelUnreadCount,
            updateDmUnreadCount,
            resetDmUnreadCount,
            dmUnreadMessageCount
         }}
      >
         {children}
      </MessageStatusContext.Provider>
   );
};

export default MessageStatusContext;
