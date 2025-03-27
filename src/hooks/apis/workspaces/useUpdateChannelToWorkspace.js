import { updateChannelToWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateChannelToWorkspace = (workspaceId) => {
   const { auth } = useAuth();
   const { toast } = useToast();

   const queryClient = useQueryClient();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: useUpdateChannelMutation
   } = useMutation({
      mutationFn: ({ channelId, channelName }) =>
         updateChannelToWorkspaceRequest({
            workspaceId,
            channelId,
            channelName,
            token: auth?.token
         }),
      onSuccess: () => {
         toast({
            title: 'Channel Updated Successfully',
            message: 'The channel name has been updated in your workspace.',
            type: 'success'
         });
         queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
      },
      onError: (error) => {
         toast({
            title: 'Failed to Update channel',
            message:
               error?.message || 'An error occurred while updating the channel. Please try again.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      useUpdateChannelMutation
   };
};
