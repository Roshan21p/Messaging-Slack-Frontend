import { fetchWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

export const useFetchWorkspace = (options = {}) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isFetching,
      isSuccess,
      error,
      isError,
      data: workspaces
   } = useQuery({
      queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
      queryKey: ['fetchWorkspaces'],
      staleTime: 20 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      enabled: !!auth?.token && (options.enabled ?? true),
      retry: false, // optional: prevent retries on failure
      throwOnError: (error) => {
         toast({
            title: 'Failed to Fetch Workspace Details',
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
      isSuccess,
      error,
      isError,
      workspaces
   };
};
