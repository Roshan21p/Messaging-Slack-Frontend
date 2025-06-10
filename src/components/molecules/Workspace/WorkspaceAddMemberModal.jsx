import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { useFetchAllUsers } from '@/hooks/apis/auth/useFetchAllUsers';
import { useAddMemberToWorkspace } from '@/hooks/apis/workspaces/useAddMemberToWorkspace';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const WorkspaceAddMemberModal = () => {
   const { auth } = useAuth();
   const queryClient = useQueryClient();

   const { openDmModal, setOpenDmModal, currentWorkspace: workspace } = useCurrentWorkspace();
   const { isPending, addMemberToWorkspaceMutation } = useAddMemberToWorkspace();
   const { userDetails, isSuccess } = useFetchAllUsers({ enabled: openDmModal });

   const [selectedUserId, setSelectedUserId] = useState(null);

   const workspaceId = workspace?._id;
   // Get member IDs already in the workspace
   const existingMemberIds = workspace?.members?.map((member) => member.memberId?._id) || [];

   // Filtered users: not the logged-in user, and not already in the workspace
   const filteredUsers = isSuccess
      ? userDetails?.filter(
           (user) => user?._id !== auth?.user?._id && !existingMemberIds.includes(user?._id)
        )
      : [];

   const handleOnSubmit = async (e) => {
      e.preventDefault();

      if (!selectedUserId) {
         toast.error('Please select a user to add.');
         return;
      }

      try {
         await addMemberToWorkspaceMutation({ workspaceId, memberId: selectedUserId });
         queryClient.invalidateQueries([`fetchWorkspaceById-${workspaceId}`]);
      } catch (error) {
         console.log('error in adding member to workspace', error);
      }
      setOpenDmModal(false);
      setSelectedUserId(null);
   };

   return (
      <Dialog
         open={openDmModal}
         onOpenChange={(open) => {
            setOpenDmModal(open);
            if (!open) {
               setSelectedUserId(null);
            }
         }}
      >
         <DialogContent>
            <form onSubmit={handleOnSubmit}>
               <DialogHeader>
                  <DialogTitle>Add Member to Workspace</DialogTitle>
                  <DialogDescription>Select a user to add to this workspace.</DialogDescription>
               </DialogHeader>

               <div className="space-y-2 max-h-[300px] overflow-y-auto my-4">
                  {filteredUsers.length > 0 ? (
                     filteredUsers.map((user) => (
                        <div
                           key={user._id}
                           onClick={() => setSelectedUserId(user._id)}
                           className={`p-2 cursor-pointer rounded border ${
                              selectedUserId === user._id
                                 ? 'bg-blue-500 text-white'
                                 : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                           }`}
                        >
                           {user.username}
                        </div>
                     ))
                  ) : (
                     <p className="text-sm text-gray-500">No users available to add.</p>
                  )}
               </div>

               <DialogFooter>
                  <Button type="submit" disabled={!selectedUserId || isPending} className="w-full">
                     {isPending ? 'Adding...' : 'Add Member'}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};
