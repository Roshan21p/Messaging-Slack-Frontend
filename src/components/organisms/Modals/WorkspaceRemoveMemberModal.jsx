import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { useDeleteMemberFromWorkspace } from '@/hooks/apis/workspaces/useDeleteMemberFromWorkspace';
import { useConfirm } from '@/hooks/useConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const WorkspaceRemoveMemberModal = ({
   openDeleteModal,
   setOpenDeleteModal,
   deleteMembers = []
}) => {
   const { workspaceId } = useParams();

   const queryClient = useQueryClient(); // ✅ add this

   const [selectedUserId, setSelectedUserId] = useState(null);

   const { isPending, deleteMemberFromWorkspaceMutation } = useDeleteMemberFromWorkspace();

   const { confirmation, ConfirmDialog } = useConfirm({
      title: 'Remove this member?',
      message:
         'Are you sure you want to remove this member from the workspace? This action cannot be undone.'
   });

   const handleOnSubmit = async (e) => {
      e.preventDefault();

      if (!selectedUserId) {
         toast.error('Please select a user to delete.');
         return;
      }

      const ok = await confirmation();
      if (!ok) return;

      try {
         await deleteMemberFromWorkspaceMutation({ workspaceId, memberId: selectedUserId });
         queryClient.invalidateQueries([`fetchWorkspaceById-${workspaceId}`]);
      } catch (error) {
         console.log('error in adding member to workspace', error);
      }
      setSelectedUserId(null);
      setOpenDeleteModal(false);
   };

   return (
      <>
         <ConfirmDialog />
         <Dialog
            open={openDeleteModal}
            onOpenChange={(open) => {
               setOpenDeleteModal(open);
               if (!open) {
                  setSelectedUserId(null);
               }
            }}
         >
            <DialogContent>
               <form onSubmit={handleOnSubmit}>
                  <DialogHeader>
                     <DialogTitle>Remove Member from Workspace</DialogTitle>
                     <DialogDescription>
                        Select a user to remove from this workspace.
                     </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto my-4">
                     {deleteMembers?.length > 0 ? (
                        deleteMembers?.map((member) => (
                           <div
                              key={member?.memberId?._id}
                              onClick={() => setSelectedUserId(member?.memberId?._id)}
                              className={`p-2 cursor-pointer rounded border ${
                                 selectedUserId === member?.memberId?._id
                                    ? 'bg-red-500 text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                           >
                              {member?.memberId?.username ||
                                 member?.memberId?.email ||
                                 'Unknown User'}
                           </div>
                        ))
                     ) : (
                        <p className="text-sm text-gray-500">No members available to remove.</p>
                     )}
                  </div>

                  <DialogFooter>
                     <Button
                        type="submit"
                        disabled={!selectedUserId || isPending}
                        className="w-full"
                        variant="destructive"
                     >
                        <TrashIcon className="size-5" />
                        {isPending ? 'Removing...' : 'Remove Member'}
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </>
   );
};
