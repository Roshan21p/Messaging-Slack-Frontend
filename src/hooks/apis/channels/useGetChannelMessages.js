import { getPaginatedMessages } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelMessages = (channelId) => {
   const { auth } = useAuth();

   const { isFetching, isError, error, data, isSuccess } = useQuery({
      queryFn: () => getPaginatedMessages({ channelId, limit: 100, page: 1, token: auth?.token }),
      queryKey: ['getPaginatedMessages', channelId],
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
