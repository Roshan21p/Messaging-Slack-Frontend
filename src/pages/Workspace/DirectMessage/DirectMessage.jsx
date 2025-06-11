import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { DirectMessageHeader } from '@/components/molecules/DirectMessage/DirectMessageHeader';
import { Message } from '@/components/molecules/Message/Message';
import { useGetByUsername } from '@/hooks/apis/auth/useGetByUsername';
import { useGetDirectMessages } from '@/hooks/apis/DirectMessage/useGetDirectMessages';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export const DirectMessage = () => {
   const { id, username } = useParams();

   const { isFetching, isError, userDetails } = useGetByUsername({
      username,
      id
   });

   const { auth } = useAuth();

   const { messageList, setMessageList } = useChannelMessages();

   const { messages, isSuccess } = useGetDirectMessages(id);

   const messageContainerListRef = useRef(null);

   const { joinDmRoom, leaveDmRoom, typingUsers } = useSocket();

   const roomId = [auth?.user?._id, id].sort().join('_');

   const typingUsersToShow = typingUsers.filter((user) => user !== auth?.user?.username);

   useEffect(() => {
      setMessageList([]);
   }, [id, username]);

   useEffect(() => {
      if (messageContainerListRef.current) {
         messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
      }
   }, [messageList]);

   useEffect(() => {
      // Leave the previous channel before joining new one
      return () => {
         if (id && roomId) {
            leaveDmRoom(roomId);
         }
      };
   }, [id, username, isSuccess, isError, isFetching]);

   useEffect(() => {
      if (!isFetching && !isError && id) {
         console.log('roomid', roomId);
         joinDmRoom(roomId);
      }
   }, [id, username, isFetching, isError, isSuccess]);

   useEffect(() => {
      if (isSuccess) {
         setMessageList([...messages].reverse());
      }
   }, [isSuccess, messages, setMessageList, id]);

   if (isFetching) {
      return (
         <div className="h-full flex-1 flex items-center justify-center">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
         </div>
      );
   }

   if (isError) {
      return (
         <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
            <TriangleAlertIcon className="size-6 text-muted-foreground" />
            <span className="sm:text-sm md:text-lg text-muted-foreground">User Not found</span>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full">
         <DirectMessageHeader name={username} userDetails={userDetails} className="fixed top-0" />

         {/* We need to make sure that below div is scrollable for the messages */}
         <div className="flex-6 overflow-y-auto p-5 gap-y-2" ref={messageContainerListRef}>
            {messageList?.map((message) => {
               return (
                  <Message
                     key={message?._id}
                     body={message?.body}
                     authorImage={message?.senderId?.avatar}
                     authorName={message?.senderId?.username}
                     createdAt={message?.createdAt}
                     image={message?.image}
                  />
               );
            })}
         </div>

         {typingUsersToShow.length > 0 && (
            <div className="text-xs px-20 pb-2 text-green-600 flex items-center gap-2 animate-pulse">
               <span className="font-medium">
                  {typingUsersToShow.join(', ')}{' '}
                  {typingUsersToShow.length === 1 ? 'is typing' : 'are typing'}
               </span>
               <span className="flex space-x-1">
                  <span className="h-1.5 w-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 bg-green-600 rounded-full animate-bounce" />
               </span>
            </div>
         )}
         <div className="flex-0.5" />
         <ChatInput />
      </div>
   );
};
