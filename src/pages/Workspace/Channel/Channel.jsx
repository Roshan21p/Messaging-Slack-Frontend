import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';

import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useRoom } from '@/hooks/context/socket/useRoom';
import { useTyping } from '@/hooks/context/socket/useTyping';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';

import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';

export const Channel = () => {
   const { channelId } = useParams();
   const navigate = useNavigate();

   const { logout } = useAuth();

   const { isFetching, isError, channelDetails, error } = useGetChannelById(channelId);
   const { messageList, setMessageList } = useChannelMessages();

   // const { joinChannel, leaveChannel } = useSocket();

   const { joinChannel, leaveChannel } = useRoom();

   const { messages, isSuccess } = useGetChannelMessages(channelId);

   const messageContainerListRef = useRef(null);

   //const { typingUsers } = useSocket();
   const { typingUsers } = useTyping();

   const { auth } = useAuth();

   const typingUsersToShow = typingUsers.filter((user) => user !== auth?.user?.username);

   useEffect(() => {
      setMessageList([]);
   }, [channelId]);

   useEffect(() => {
      if (messageContainerListRef.current) {
         messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
      }
   }, [messageList]);

   // Handle errors & auth
   useEffect(() => {
      if (!isFetching && isError && error?.status === 403) {
         logout();
         navigate('/auth/signin');
      }
   }, [isFetching, isError, error, logout, navigate]);

   useEffect(() => {
      // Leave the previous channel before joining new one
      return () => {
         if (channelId) {
            leaveChannel(channelId);
         }
      };
   }, [channelId, isError, isFetching]);

   useEffect(() => {
      if (!isFetching && !isError && channelId) {
         joinChannel(channelId);
      }
   }, [channelId, isFetching, isError]);

   useEffect(() => {
      if (isSuccess) {
         setMessageList([...messages].reverse());
      }
   }, [isSuccess, messages, setMessageList, channelId]);

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
            <span className="sm:text-sm md:text-lg text-muted-foreground">Channel Not found</span>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full">
         <ChannelHeader name={channelDetails?.name} className="fixed top-0" />

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
