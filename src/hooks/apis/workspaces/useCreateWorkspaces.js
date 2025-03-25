import { createWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkspace = () => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: createWorkspaceMutation
   } = useMutation({
      mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth?.token }),
      onSuccess: (data) => {
         console.log('Successfully created workspace', data);
         toast({
            title: 'Workspace Created',
            message: 'The workspace has been created successfully.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.error('Failed to create workspace', error);
         toast({
            title: 'Failed to Create Workspace',
            message:
               error?.message ||
               'An unexpected error occurred while trying to create the workspace. Please try again later.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      createWorkspaceMutation
   };
};
