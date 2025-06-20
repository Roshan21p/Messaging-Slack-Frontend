import { RefreshCcwIcon } from 'lucide-react';

import { useResetJoinCode } from '@/hooks/apis/workspaces/useResetJoinCode';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';

export const WorkspaceInviteModal = ({
   openInviteModal,
   setOpenInviteModal,
   workspaceName,
   joinCode,
   workspaceId
}) => {
   const { toast } = useToast();
   const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);

   const inviteLink = `${window.location.origin}/workspaces/join/${workspaceId}?code=${joinCode}`;

   async function handleCopyInviteLink() {
      await navigator.clipboard.writeText(inviteLink);
      toast({
         title: 'Invite link copied to clipboard',
         type: 'success'
      });
   }

   async function handleResetCode() {
      try {
         const res = await resetJoinCodeMutation();
         console.log('res', res);
      } catch (error) {
         console.log('Error in resetting join code', error);
      }
   }

   return (
      <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Invite People to {workspaceName}</DialogTitle>
               <DialogDescription>
                  Invite link below to invite people to your workspace
               </DialogDescription>
            </DialogHeader>

            <DialogClose>
               <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                  {/* Join Code Display */}
                  <div className="bg-gray-100 px-6 py-2 rounded text-2xl font-mono cursor-pointer select-all">
                     {joinCode}
                  </div>

                  <Button
                     size="sm"
                     variant="outline"
                     onClick={handleCopyInviteLink}
                     className="cursor-pointer hover:bg-gray-300"
                  >
                     Copy Invite Link
                  </Button>
               </div>
            </DialogClose>

            <DialogClose>
               <div className="flex items-center justify-center w-full">
                  <Button
                     variant="outline"
                     onClick={handleResetCode}
                     className="cursor-pointer hover:bg-gray-300"
                  >
                     Reset Join Code
                     <RefreshCcwIcon className="size-4 ml-2" />
                  </Button>
               </div>
            </DialogClose>
         </DialogContent>
      </Dialog>
   );
};
