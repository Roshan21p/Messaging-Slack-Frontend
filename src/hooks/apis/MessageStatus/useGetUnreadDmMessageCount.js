import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { getUnreadDmMessageCount } from '@/apis/MessageStatus';

export const useGetUnreadDmMessageCount = () => {
   const { auth } = useAuth();

   const {
      isFetching,
      isSuccess,
      isError,
      error,
      data: unreadDmMessageCount
   } = useQuery({
      queryFn: () => getUnreadDmMessageCount({ token: auth?.token }),
      queryKey: ['unreadDmMessageCount', auth?.user?._id],
      enabled: !!auth?.token,
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000
   });

   return {
      isFetching,
      isError,
      isSuccess,
      error,
      unreadDmMessageCount
   };
};
