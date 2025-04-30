import { fetchWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

export const useFetchWorkspace = () => {
   const { auth } = useAuth();
   const { toast } = useToast();
   const {
      isFetching,
      isSuccess,
      error,
      data: workspaces
   } = useQuery({
      queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
      queryKey: ['fetchWorkspaces'],
      enabled: !!auth?.token, // only fetch when token is available
      staleTime: 30000,
      retry: 2,
      retryOnMount: true,
      throwOnError: (error) => {
         toast({
            title: 'Failed to Fetch Workspace Details',
            message: error?.message || 'An unexpected error occurred. Please try again.',
            type: 'error'
         });
      }
   });

   return {
      isFetching,
      isSuccess,
      error,
      workspaces
   };
};
