import { useState } from 'react';

import { useUpdateChannelToWorkspace } from '@/hooks/apis/workspaces/useUpdateChannelToWorkspace';
import { useConfirm } from '@/hooks/useConfirm';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const EditChannelModal = ({
   ChannelName,
   channelId,
   editOpen,
   setEditOpen,
   workspaceId
}) => {
   const [renameValue, setRenameValue] = useState(ChannelName);

   const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } = useConfirm({
      title: 'Do you want to update the channel?',
      message: 'This action cannot be undone.'
   });

   const { UpdateChannelMutation } = useUpdateChannelToWorkspace(workspaceId);

   async function handleFormSubmit(e) {
      e.preventDefault();
      try {
         const ok = await updateConfirmation();
         if (!ok) return;
         await UpdateChannelMutation({
            channelId,
            channelName: renameValue
         });
      } catch (error) {
         console.log('Error in update channel to workspace', error);
      }
   }

   return (
      <>
         <UpdateDialog />
         <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Rename channel</DialogTitle>
               </DialogHeader>

               <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <Input
                     required
                     value={renameValue}
                     autoFocus
                     minLength={3}
                     maxLength={20}
                     placeholder="Channel Name e.g. Web Team"
                     onChange={(e) => setRenameValue(e.target.value)}
                  />

                  <Button type="submit" size="lg" className="w-full cursor-pointer">
                     Save
                  </Button>
               </form>
               <DialogClose>
                  <Button variant="outline" className="hover:bg-gray-200 cursor-pointer w-full">
                     Cancel
                  </Button>
               </DialogClose>
            </DialogContent>
         </Dialog>
      </>
   );
};
