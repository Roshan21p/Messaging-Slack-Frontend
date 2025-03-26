import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { useResetJoinCode } from '@/hooks/apis/workspaces/useResetJoinCode';
import { useToast } from '@/hooks/use-toast';
import { RefreshCcwIcon } from 'lucide-react';

export const WorkspaceInviteModal = ({
   openInviteModal,
   setOpenInviteModal,
   workspaceName,
   joinCode,
   workspaceId
}) => {
   const { toast } = useToast();

   const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);

   async function handleCopy() {
      const inviteLink = `${window.location.origin}/join/${joinCode}`;
      await navigator.clipboard.writeText(inviteLink);
      toast({
         title: 'Link copied to clipboard',
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
                  Use the code shown below to invite people to your workspace
               </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center py-10 gap-y-4">
               <p className="font-bold text-4xl uppercase">{joinCode}</p>
               <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="cursor-pointer hover:bg-gray-300"
               >
                  Copy Code
               </Button>
            </div>
            <div className="flex items-center justify-center w-full ">
               <Button
                  variant="outline"
                  onClick={handleResetCode}
                  className="cursor-pointer hover:bg-gray-300"
               >
                  Reset Join Code
                  <RefreshCcwIcon className="size-4 ml-2" />
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};
