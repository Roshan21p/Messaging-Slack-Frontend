import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';

import { getPaginatedDirectMessages } from '@/apis/DirectMessage';

export const useGetDirectMessages = (receiverId) => {
   const { auth } = useAuth();

   const { isFetching, isError, error, data, isSuccess } = useQuery({
      queryFn: () =>
         getPaginatedDirectMessages({ receiverId, limit: 100, page: 1, token: auth?.token }),
      queryKey: ['getPaginatedDirectMessages', receiverId],
      retry: false,
      retryOnMount: true
   });

   return {
      isFetching,
      isError,
      error,
      messages: data,
      isSuccess
   };
};
