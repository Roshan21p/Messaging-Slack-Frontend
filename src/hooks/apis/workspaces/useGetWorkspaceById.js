import { fetchWorkspaceDetailsRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspaceById = (id) => {
   const { auth } = useAuth();

   const {
      isFetching,
      isSuccess,
      error,
      data: workspace
   } = useQuery({
      queryFn: () => fetchWorkspaceDetailsRequest({ workspaceId: id, token: auth?.token }),
      queryKey: [`fetchWorkspaceById-${id}`],
      staleTime: 10000,
      retry: 1,
      retryOnMount: true
   });

   console.log('hello', error);

   return {
      isFetching,
      isSuccess,
      error,
      workspace
   };
};
