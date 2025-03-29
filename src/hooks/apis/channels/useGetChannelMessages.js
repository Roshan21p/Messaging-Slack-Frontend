import { getPaginatedMessages } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelMessages = (channelId) => {
   const { auth } = useAuth();

   console.log('channel hello', channelId);

   const { isFetching, isError, error, data, isSuccess } = useQuery({
      queryFn: () => getPaginatedMessages({ channelId, limit: 10, offset: 0, token: auth?.token }),
      queryKey: ['getPaginatedMessages', channelId],
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
