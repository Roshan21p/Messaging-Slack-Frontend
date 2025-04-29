import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export const Channel = () => {
   const { channelId } = useParams();

   const { isFetching, isError, channelDetails } = useGetChannelById(channelId);
   const { messageList, setMessageList } = useChannelMessages();

   const { joinChannel, leaveChannel } = useSocket();

   const { messages, isSuccess } = useGetChannelMessages(channelId);

   const messageContainerListRef = useRef(null);

   console.log('messageList', messageList);

   useEffect(() => {
      setMessageList([]);
   }, [channelId]);

   useEffect(() => {
      if (messageContainerListRef.current) {
         messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
      }
   }, [messageList]);

   useEffect(() => {
      let hasJoined = false;

      if (!isFetching && !isError) {
         joinChannel(channelId);
         hasJoined = true;
      }

       // Cleanup function to leave channel
       return () => {
         if (hasJoined && channelId) {
            leaveChannel(channelId);
         }
      };
   }, [isFetching, isError, joinChannel, leaveChannel, channelId]);

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
         <ChannelHeader name={channelDetails?.name} />

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
         <div className="flex-0.5" />
         <ChatInput />
      </div>
   );
};
