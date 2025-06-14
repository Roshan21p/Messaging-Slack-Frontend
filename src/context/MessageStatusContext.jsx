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
      if (isSuccess && apiUnreadCount?.channels?.length > 0) {
         setUnreadMessageCount(apiUnreadCount.channels); // store only channels here
      }
   }, [isSuccess, apiUnreadCount]);

   const updateChannelUnreadCount = (channelId) => {
      setUnreadMessageCount((prev) => {
         const existing = prev.find((item) => item.channelId?._id === channelId);

         if (existing) {
            console.log('existing');

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

   return (
      <MessageStatusContext.Provider
         value={{
            unreadMessageCount,
            updateChannelUnreadCount
         }}
      >
         {children}
      </MessageStatusContext.Provider>
   );
};

export default MessageStatusContext;
