import { WorkspaceInviteModal } from '@/components/organisms/Modals/WorkspaceInviteModal';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { ChevronDownCircle, ListFilterIcon, SquarePenIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WorkspaceRemoveMemberModal } from '@/components/organisms/Modals/WorkspaceRemoveMemberModal';

export const WorkspacePanelHeader = ({ workspace }) => {
   const workspaceMembers = workspace?.members;

   const { auth } = useAuth();

   const [openInviteModal, setOpenInviteModal] = useState(false);
   const [openDeleteModal, setOpenDeleteModal] = useState(false);

   const { setOpenPreferences, setInitialValue, setWorkspace } = useWorkspacePreferencesModal();

   const isLoggedInUserAdminOfWorkspace = workspaceMembers?.find(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'admin'
   );

   const deleteMembers = workspaceMembers?.filter(
      (member) => member?.memberId?._id !== auth?.user?._id
   );

   useEffect(() => {
      setWorkspace(workspace);
   }, []);

   return (
      <>
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
