import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';

import { getUnreadMessageCount } from '@/apis/MessageStatus';

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
      enabled: !!auth?.token && !!workspaceId,
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000
   });

   return {
      isFetching,
      isError,
      isSuccess,
      error,
      unreadMessageCount
   };
};
