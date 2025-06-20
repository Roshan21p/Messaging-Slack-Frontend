import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { resetJoinCodeRequest } from '@/apis/workspaces';

export const useResetJoinCode = (workspaceId) => {
   const { auth } = useAuth();
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: resetJoinCodeMutation
   } = useMutation({
      mutationFn: () => resetJoinCodeRequest({ workspaceId, token: auth?.token }),
      onSuccess: (data) => {
         console.log('Join code reset successfully', data);
         toast({
            title: 'Join Code Reset',
            message: 'A new join code has been generated successfully.',
            type: 'success'
         });
         queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
      },
      onError: (error) => {
         toast({
            title: 'Failed to Reset Join Code',
            message:
               error?.message ||
               'Something went wrong while resetting the join code. Please try again.',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      resetJoinCodeMutation
   };
};
