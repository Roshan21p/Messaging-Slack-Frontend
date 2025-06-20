import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { getUserByUsername } from '@/apis/auth';

export const useGetByUsername = ({ username, id }) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isFetching,
      isSuccess,
      isError,
      error,
      data: userDetails
   } = useQuery({
      queryFn: () => getUserByUsername({ username, id, token: auth?.token }),
      queryKey: [`get-user-${username}`],
      enabled: !!auth?.token,
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
      throwOnError: (error) => {
         toast({
            title: 'Failed to Fetch the user details',
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
      isSuccess,
      error,
      userDetails
   };
};
