import { getChannelById } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelById = (channelId) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isFetching,
      isError,
      error,
      data: channelDetails
   } = useQuery({
      queryFn: () => getChannelById({ channelId, token: auth?.token }),
      queryKey: [`get-channel-${channelId}`],
      enabled: !!auth?.token, // only fetch when token is available
      retry: 1,
      retryOnMount: true,
      throwOnError: (error) => {
         toast({
            title: 'Failed to Fetch channel Details',
            message:
               error?.data?.message ||
               error?.message ||
               'An unexpected error occurred. Please try again.',
            type: 'error'
         });
      }
   });

   return {
      isFetching,
      isError,
      error,
      channelDetails
   };
};
