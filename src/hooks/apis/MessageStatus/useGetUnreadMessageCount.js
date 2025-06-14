import { getUnreadMessageCount } from '@/apis/MessageStatus';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetUnreadMessageCount = (workspaceId) => {
   const { auth } = useAuth();

   const {
      isFetching,
      isSuccess,
      isError,
      error,
      data: unreadMessageCount
   } = useQuery({
      queryFn: () => getUnreadMessageCount({ workspaceId, token: auth?.token }),
      queryKey: ['unreadMessageCount', workspaceId, auth?.user?._id],
      enabled: !!auth?.token && !!workspaceId
   });

   return {
      isFetching,
      isError,
      isSuccess,
      error,
      unreadMessageCount
   };
};
