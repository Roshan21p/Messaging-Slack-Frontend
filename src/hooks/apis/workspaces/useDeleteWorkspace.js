import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { deleteWorkspaceRequest } from '@/apis/workspaces';

export const useDeleteWorkspace = (workspaceId) => {
   const { auth } = useAuth();

   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: deleteWorkspaceMutation
   } = useMutation({
      mutationFn: () => deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
      onSuccess: () => {
         console.log('Workspace deleted successfully');
         toast({
            title: 'Workspace Deleted',
            message: 'The workspace has been removed successfully.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.log('Error in deleting workspace', error);
         toast({
            title: 'Failed to Delete Workspace',
            message:
               error?.message ||
               'An unexpected error occurred while trying to delete the workspace. Please try again later.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      deleteWorkspaceMutation
   };
};
