import { useGetUnreadMessageCount } from '@/hooks/apis/MessageStatus/useGetUnreadMessageCount';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { createContext, useEffect, useState } from 'react';

const MessageStatusContext = createContext();

export const MessageStatusContextProvider = ({ children }) => {
   const { currentWorkspace } = useCurrentWorkspace();
   const workspaceId = currentWorkspace?._id;

   const { unreadMessageCount: apiUnreadCount, isSuccess } = useGetUnreadMessageCount(workspaceId);

   const [unreadMessageCount, setUnreadMessageCount] = useState([]);

   // Set initial unread message count from API
   useEffect(() => {
      if (isSuccess && apiUnreadCount?.channels) {
         setUnreadMessageCount(apiUnreadCount.channels); // store only channels here
         console.log('Updated unreadMessageCount:', apiUnreadCount.channels);
      }
   }, [isSuccess, apiUnreadCount]);

   const updateChannelUnreadCount = (channelId) => {
      setUnreadMessageCount((prev) => {
         const existing = prev.find((item) => item.channelId?._id === channelId);

         if (existing) {
            return prev.map((item) =>
               item.channelId?._id === channelId
                  ? { ...item, unreadCount: item.unreadCount + 1 }
                  : item
            );
         } else {
            return [...prev, { channelId, unreadCount: 1 }];
         }
      });
   };

   const resetUnreadCount = (channelId) => {
      setUnreadMessageCount((prev) =>
         prev.map((item) =>
            item.channelId?._id === channelId ? { ...item, unreadCount: 0 } : item
         )
      );
   };

   return (
      <MessageStatusContext.Provider
         value={{
            unreadMessageCount,
            setUnreadMessageCount,
            updateChannelUnreadCount,
            resetUnreadCount
         }}
      >
         {children}
      </MessageStatusContext.Provider>
   );
};

export default MessageStatusContext;
