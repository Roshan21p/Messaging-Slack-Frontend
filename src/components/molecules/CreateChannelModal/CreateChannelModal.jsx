import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAddChannelToWorkspace } from '@/hooks/apis/workspaces/useAddChannelToWorkspace';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const CreateChannelModal = () => {
   const queryClient = useQueryClient();

   const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
   const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace();
   const { currentWorkspace } = useCurrentWorkspace();

   const [channelName, setChannelName] = useState('');

   function handleClose() {
      setOpenCreateChannelModal(false);
   }

   async function handleFormSubmit(e) {
      e.preventDefault();

      await addChannelToWorkspaceMutation({
         workspaceId: currentWorkspace?._id,
         channelName: channelName
      });

      queryClient.invalidateQueries(`fetchWorkspaceById-${currentWorkspace?._id}`);
   }

   return (
      <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create a Channel</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleFormSubmit}>
               <Input
                  required
                  onChange={(e) => setChannelName(e.target.value)}
                  value={channelName}
                  minLength={3}
                  placeholder="Channel Name e.g. team-announcments"
               />

               <DialogFooter>
                  <DialogClose>
                     <div className="flex justify-end mt-4">
                        <Button>Create Channel</Button>
                     </div>
                  </DialogClose>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};
