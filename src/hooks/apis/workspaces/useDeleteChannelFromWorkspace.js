import { deleteChannelWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteChannelFromWorkspace = () => {
   const { auth } = useAuth();

   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: deleteChannelWorkspaceMutation
   } = useMutation({
      mutationFn: ({ workspaceId, channelId }) =>
         deleteChannelWorkspaceRequest({ workspaceId, channelId, token: auth?.token }),
      onSuccess: () => {
         console.log('Channel deleted successfully');
         toast({
            title: 'Channel Deleted',
            message: 'The channel has been delete successfully from workspace.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.log('Error in deleting channel from workspace', error);
         toast({
            title: 'Failed to Delete channel from workspace',
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
      deleteChannelWorkspaceMutation
   };
};
