import { getPaginatedDirectMessages } from '@/apis/DirectMessage';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetDirectMessages = (receiverId) => {
   const { auth } = useAuth();

   const { isFetching, isError, error, data, isSuccess } = useQuery({
      queryFn: () =>
         getPaginatedDirectMessages({ receiverId, limit: 20, offset: 0, token: auth?.token }),
      queryKey: ['getPaginatedDirectMessages', receiverId],
      staleTime: 0,
      retry: 1,
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
