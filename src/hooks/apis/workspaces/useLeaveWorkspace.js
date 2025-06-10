import { LeaveWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useLeaveWorkspace = () => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: leaveWorkspaceMutation
   } = useMutation({
      mutationFn: ({ workspaceId }) => LeaveWorkspaceRequest({ workspaceId, token: auth?.token }),
      onSuccess: () => {
         toast({
            title: 'Member leave from Workspace',
            message: 'You have successfully left the workspace.',
            type: 'success'
         });
      },
      onError: (error) => {
         toast({
            title: 'Failed to leave Member from workspace',
            message:
               error?.message ||
               'Something went wrong while leaving the member from workspace. Please try again.',
            type: 'error'
         });
      }
   });
   return {
      isPending,
      isSuccess,
      error,
      leaveWorkspaceMutation
   };
};
