import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/hooks/apis/workspaces/useUpdateWorkspace';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useConfirm } from '@/hooks/useConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WorkspacePreferencesModal = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { initialValue, openPreferences, setOpenPreferences, workspace } =
      useWorkspacePreferencesModal();

   const [workspaceId, setWorkspaceId] = useState(null);
   const [editOpen, setEditOpen] = useState(false);
   const [renameValue, setRenameValue] = useState(workspace?.name);

   const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
   const { updateWorkspaceMutation, isPending } = useUpdateWorkspace(workspaceId);
   const { confirmation, ConfirmDialog } = useConfirm({
      title: 'Do you want to delete the workspace?',
      message: 'This action cannot be undone.'
   });
   const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } = useConfirm({
      title: 'Do you want to update the workspace?',
      message: 'This action cannot be undone.'
   });
   function handleClose() {
      setOpenPreferences(false);
   }

   useEffect(() => {
      setWorkspaceId(workspace?._id);
      setRenameValue(workspace?.name);
   }, [workspace]);

   async function handleDelete() {
      try {
         const ok = await confirmation();
         console.log('Confirmation received');
         if (!ok) return;

         await deleteWorkspaceMutation();
         navigate('/');
         queryClient.invalidateQueries('fetchWorkspaces');
         setOpenPreferences(false);
      } catch (error) {
         console.error('error while deleteing workspace', error);
      }
   }

   async function handleFormSubmit(e) {
      e.preventDefault();
      try {
         const ok = await updateConfirmation();
         console.log('Confirmation recieved');
         if (!ok) return;
         await updateWorkspaceMutation(renameValue);
         queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
         setOpenPreferences(false);
      } catch (error) {
         console.error('Error in updating workspace', error);
      }
   }
   return (
      <>
         <ConfirmDialog />
         <UpdateDialog />
         <Dialog open={openPreferences} onOpenChange={handleClose}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>{initialValue}</DialogTitle>
               </DialogHeader>

               <div className="px-4 pb-4 flex flex-col gap-y-2">
                  <Dialog open={editOpen} onOpenChange={setEditOpen}>
                     <DialogTrigger>
                        <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                           <div className="flex items-center justify-between">
                              <p className="font-semibold text-sm">Workspace Name</p>
                              <p className="text-sm font-semibold hover:underline">Edit</p>
                           </div>
                           <p className="justify-self-start text-sm font-normal">{initialValue}</p>
                        </div>
                     </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Rename Workspace</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                           <Input
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              required
                              autoFocus
                              minLength={3}
                              maxLength={50}
                              disabled={isPending}
                              placeholder="Workspace Name e.g. Design Team"
                           />

                           <DialogFooter>
                              <Button
                                 type="submit"
                                 disabled={isPending}
                                 size="lg"
                                 className="w-full cursor-pointer"
                              >
                                 Save
                              </Button>
                           </DialogFooter>
                        </form>
                        <DialogClose>
                           <Button
                              variant="outline"
                              disabled={isPending}
                              className="hover:bg-gray-200 cursor-pointer w-full"
                           >
                              Cancel
                           </Button>
                        </DialogClose>
                     </DialogContent>
                  </Dialog>

                  <button
                     className="flex items-center justify-center gap-x-2 px-5 py-4 bg-red-500 rounded-lg border cursor-pointer"
                     onClick={handleDelete}
                  >
                     <TrashIcon className="size-5 text-white" />
                     <p className="text-sm font-semibold text-white">Delete Workspace</p>
                  </button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
};
