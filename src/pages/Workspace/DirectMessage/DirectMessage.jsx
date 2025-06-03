import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { DirectMessageHeader } from '@/components/molecules/DirectMessage/DirectMessageHeader';
import { Message } from '@/components/molecules/Message/Message';
import { useGetByUsername } from '@/hooks/apis/auth/useGetByUsername';
import { useParams } from 'react-router-dom';

export const DirectMessage = () => {
   const { id, username } = useParams();

   const { isFetching, isError, isSuccess, userDetails, error } = useGetByUsername({
      username,
      id
   });

   return (
      <div className="flex flex-col h-full">
         <DirectMessageHeader name={username} />

         <div className="flex-6 overflow-y-auto p-5 gap-y-2"></div>
         <div className="flex-0.5" />
         <ChatInput />
      </div>
   );
};
