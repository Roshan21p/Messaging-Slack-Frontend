import { addMemberToWorkspace } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useAddMemberToWorkspace = () => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: addMemberToWorkspaceMutation
   } = useMutation({
      mutationFn: ({ workspaceId, memberId }) =>
         addMemberToWorkspace({ workspaceId, memberId, token: auth?.token }),
      onSuccess: (data) => {
         toast({
            title: 'Member added to Workspace',
            message: 'Successfully user added to Workspace',
            type: 'success'
         });
      },
      onError: (error) => {
         toast({
            title: 'Failed to add Member to workspace',
            message:
               error?.message ||
               'Something went wrong while adding the member to workspace. Please try again.',
            type: 'error'
         });
      }
   });
   return {
      isPending,
      isSuccess,
      error,
      addMemberToWorkspaceMutation
   };
};
