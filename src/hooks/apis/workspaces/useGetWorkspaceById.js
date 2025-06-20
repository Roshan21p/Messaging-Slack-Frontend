import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';

import { fetchWorkspaceDetailsRequest } from '@/apis/workspaces';

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
      enabled: !!auth?.token && !!id,
      staleTime: 20 * 60 * 1000,
      gcTime: 30 * 60 * 1000
   });

   return {
      isFetching,
      isSuccess,
      error,
      workspace
   };
};
