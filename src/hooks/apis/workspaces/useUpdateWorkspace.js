import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { updateWorkspaceRequest } from '@/apis/workspaces';

export const useUpdateWorkspace = (workspaceId) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: updateWorkspaceMutation
   } = useMutation({
      mutationFn: (name) => updateWorkspaceRequest({ workspaceId, name, token: auth?.token }),
      onSuccess: () => {
         toast({
            title: 'Workspace Updated Successfully',
            message: 'Your workspace has been updated to the latest changes.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.log('Error in updating workspace', error);
         toast({
            title: 'Failed to Update Workspace',
            message: error?.message || 'An unexpected error occurred. Please try again later.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      updateWorkspaceMutation
   };
};
