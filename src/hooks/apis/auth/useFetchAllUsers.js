import { fetchAllUsers } from '@/apis/auth';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

export const useFetchAllUsers = () => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isFetching,
      isSuccess,
      isError,
      error,
      data: userDetails
   } = useQuery({
      queryFn: () => fetchAllUsers({ token: auth?.token }),
      queryKey: ['fetchAllUsers'],
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
