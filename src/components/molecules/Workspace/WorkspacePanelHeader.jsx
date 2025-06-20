import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronDownCircle, ListFilterIcon, LogOutIcon, SquarePenIcon } from 'lucide-react';

import { useLeaveWorkspace } from '@/hooks/apis/workspaces/useLeaveWorkspace';
import { useAuth } from '@/hooks/context/useAuth';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useConfirm } from '@/hooks/useConfirm';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { WorkspaceInviteModal } from '@/components/organisms/Modals/WorkspaceInviteModal';
import { WorkspaceRemoveMemberModal } from '@/components/organisms/Modals/WorkspaceRemoveMemberModal';

export const WorkspacePanelHeader = ({ workspace }) => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const workspaceMembers = workspace?.members;

   const { auth } = useAuth();

   const [openInviteModal, setOpenInviteModal] = useState(false);
   const [openDeleteModal, setOpenDeleteModal] = useState(false);

   const { setOpenPreferences, setInitialValue, setWorkspace } = useWorkspacePreferencesModal();
   const { isPending, leaveWorkspaceMutation } = useLeaveWorkspace();

   const { confirmation, ConfirmDialog } = useConfirm({
      title: 'Do you want to leave the workspace?',
      message: 'This action cannot be undone.'
   });

   const isLoggedInUserAdminOfWorkspace = workspaceMembers?.find(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'admin'
   );

   const currentLoggedInUserMemberOfWorkspace = workspaceMembers?.find(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'member'
   );

   const deleteMembers = workspaceMembers?.filter(
      (member) => member?.memberId?._id !== auth?.user?._id
   );

   useEffect(() => {
      setWorkspace(workspace);
   }, []);

   const handleLeaveWorkspace = async () => {
      try {
         const ok = await confirmation();
         console.log('Confirmation received');
         if (!ok) return;

         await leaveWorkspaceMutation({ workspaceId: workspace?._id });
         navigate('/');
         queryClient.invalidateQueries('fetchWorkspaces');
      } catch (error) {
         console.error('error while deleteing workspace', error);
      }
   };

   return (
      <>
         <ConfirmDialog />
         <div className="flex items-center justify-between px-4 h-[50px] gap-0.5">
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Button
                     variant="transparent"
                     className="font-semibold text-lg w-auto p-1.5 overflow-hidden cursor-pointer"
                  >
                     <span className="truncate">{workspace?.name}</span>
                     <ChevronDownCircle className="size-5 ml-1" />
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent side="bottom" align="start" className="w-64">
                  <DropdownMenuItem>
                     <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]">
                        {workspace?.name.charAt(0).toUpperCase()}
                     </div>

                     <div className="flex flex-col items-start">
                        <p className="font-bold">{workspace?.name}</p>
                        <p className="text-xs text-muted-foreground">Active Workspace</p>
                     </div>
                  </DropdownMenuItem>

                  {currentLoggedInUserMemberOfWorkspace && (
                     <DropdownMenuItem>
                        <Button
                           variant="destructive"
                           className="w-full text-white justify-center flex items-center gap-2 text-sm cursor-pointer"
                           onClick={handleLeaveWorkspace}
                           disabled={isPending}
                        >
                           <LogOutIcon className="size-4 text-white" />
                           {isPending ? 'Leaving...' : 'Leave Workspace'}
                        </Button>
                     </DropdownMenuItem>
                  )}

                  {isLoggedInUserAdminOfWorkspace && (
                     <>
                        <DropdownMenuItem
                           className="cursor-pointer py-2"
                           onClick={() => {
                              setOpenPreferences(true);
                              setInitialValue(workspace?.name);
                           }}
                        >
                           Preferences
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                           className="cursor-pointer py-2"
                           onClick={() => setOpenInviteModal(true)}
                        >
                           Invite people to {workspace?.name}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                           className="cursor-pointer py-2"
                           onClick={() => setOpenDeleteModal(true)}
                        >
                           Delete people to {workspace?.name}
                        </DropdownMenuItem>
                     </>
                  )}
               </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
               <Button variant="transparent" size="iconSm">
                  <ListFilterIcon className="size-5" />
               </Button>

               <Button variant="transparent" size="iconSm">
                  <SquarePenIcon className="size-5" />
               </Button>
            </div>
         </div>

         <WorkspaceInviteModal
            openInviteModal={openInviteModal}
            setOpenInviteModal={setOpenInviteModal}
            workspaceName={workspace?.name}
            joinCode={workspace?.joinCode}
            workspace
            Id={workspace?._id}
         />

         <WorkspaceRemoveMemberModal
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            deleteMembers={deleteMembers}
         />
      </>
   );
};
