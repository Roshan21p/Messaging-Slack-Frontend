import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { addChannelToWorkspaceRequest } from '@/apis/workspaces';

export const useAddChannelToWorkspace = () => {
   const { auth } = useAuth();

   const { toast } = useToast();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: addChannelToWorkspaceMutation
   } = useMutation({
      mutationFn: ({ workspaceId, channelName }) =>
         addChannelToWorkspaceRequest({ workspaceId, channelName, token: auth?.token }),
      onSuccess: (data) => {
         console.log('Channel added to workspace', data);

         // Get the last added channel (assuming new one is added at the end)
         const newChannel = data?.channels?.[data.channels.length - 1];

         toast({
            title: 'Channel Created Successfully',
            message: newChannel
               ? `The channel "${newChannel.name}" has been added to the workspace.`
               : 'A new channel has been added to the workspace.',
            type: 'success'
         });
      },
      onError: (error) => {
         console.log('Error adding channel to workspace', error);
         toast({
            title: 'Failed to Add Channel',
            message:
               error?.message || 'Something went wrong while adding the channel. Please try again.',
            type: 'error'
         });
      }
   });
   return {
      isPending,
      isSuccess,
      error,
      addChannelToWorkspaceMutation
   };
};
