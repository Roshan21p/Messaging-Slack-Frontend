import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { DirectMessageHeader } from '@/components/molecules/DirectMessage/DirectMessageHeader';
import { Message } from '@/components/molecules/Message/Message';
import { useGetByUsername } from '@/hooks/apis/auth/useGetByUsername';
import { useAuth } from '@/hooks/context/useAuth';
import { useSocket } from '@/hooks/context/useSocket';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const DirectMessage = () => {
   const { id, username } = useParams();

   const { auth } = useAuth();

   const { isFetching, isSuccess, userDetails, error } = useGetByUsername({
      username,
      id
   });

   const { joinDmRoom, leaveDmRoom } = useSocket();

   const roomId = [auth?.user?._id, id].sort().join('_');

   useEffect(() => {
      // Leave the previous channel before joining new one
      return () => {
         if (id) {
            leaveDmRoom(roomId);
         }
      };
   }, [id, username]);

   useEffect(() => {
      if (!isFetching && isSuccess && id) {
         console.log('roomid', roomId);
         joinDmRoom(roomId);
      }
   }, [id, isFetching, isSuccess, username]);

   return (
      <div className="flex flex-col h-full">
         <DirectMessageHeader name={username} />

         <div className="flex-6 overflow-y-auto p-5 gap-y-2"></div>
         <div className="flex-0.5" />
         <ChatInput />
      </div>
   );
};
