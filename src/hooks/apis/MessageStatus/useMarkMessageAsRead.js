import { markMessageAsRead } from '@/apis/MessageStatus';
import { useAuth } from '@/hooks/context/useAuth';
import { useMutation } from '@tanstack/react-query';

export const useMarkMessageAsRead = () => {
   const { auth } = useAuth();

   const {
      isPending,
      isSuccess,
      isError,
      error,
      mutateAsync: markMessageAsReadMutation
   } = useMutation({
      mutationFn: ({ workspaceId, channelId }) =>
         markMessageAsRead({ workspaceId, channelId, token: auth?.token })
   });

   return {
      isPending,
      isError,
      isSuccess,
      error,
      markMessageAsReadMutation
   };
};
