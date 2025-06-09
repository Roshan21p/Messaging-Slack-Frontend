import { deleteMemberFromWorkspace } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMemberFromWorkspace = () => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: deleteMemberFromWorkspaceMutation
   } = useMutation({
      mutationFn: ({ workspaceId, memberId }) =>
         deleteMemberFromWorkspace({ workspaceId, memberId, token: auth?.token }),
      onSuccess: (data) => {
         toast({
            title: 'Member delete from Workspace',
            message: 'Successfully user remove from Workspace',
            type: 'success'
         });
      },
      onError: (error) => {
         toast({
            title: 'Failed to delete Member from workspace',
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
      deleteMemberFromWorkspaceMutation
   };
};
