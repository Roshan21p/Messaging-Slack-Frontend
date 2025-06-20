import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { joinWorkspaceRequest } from '@/apis/workspaces';

export const useJoinWorkspace = (workspaceId) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: joinWorkspaceMutation
   } = useMutation({
      mutationFn: (joinCode) => joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token }),
      onSuccess: (data) => {
         console.log('Workspace joined successfully');
         toast({
            title: 'Successfully Joined!',
            message: 'You have joined the workspace successfully.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.log('Error in joining workspace', error);
         toast({
            title: 'Failed to Join!',
            message:
               error?.message ||
               'Could not join the workspace. Please check the join code and try again.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      joinWorkspaceMutation
   };
};
