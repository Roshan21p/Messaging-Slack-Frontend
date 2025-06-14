import { EditChannelModal } from '@/components/organisms/Modals/EditChannelModal';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog';
import { useDeleteChannelFromWorkspace } from '@/hooks/apis/workspaces/useDeleteChannelFromWorkspace';
import { useRoom } from '@/hooks/context/socket/useRoom';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';
import { useConfirm } from '@/hooks/useConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ChannelHeader = ({ name }) => {
   const { channelId } = useParams();
   const [editOpen, setEditOpen] = useState(false);
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { currentWorkspace: workspace } = useCurrentWorkspace();
   // const { onlineUsers } = useSocket();
   const { onlineUsers } = useRoom();

   const workspaceMembers = workspace?.members;
   const { auth } = useAuth();

   const { confirmation, ConfirmDialog } = useConfirm({
      title: 'Delete this channel?',
      message: 'This action is irreversible. All messages will be lost.'
   });

   const isLoggedInUserAdminOfWorkspace = workspaceMembers?.some(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'admin'
   );

   const { deleteChannelWorkspaceMutation } = useDeleteChannelFromWorkspace();

   const handleDelete = async () => {
      const ok = await confirmation();
      if (!ok) return;
      try {
         await deleteChannelWorkspaceMutation({ workspaceId: workspace?._id, channelId });
         queryClient.invalidateQueries('fetchWorkspaces');
         navigate(`/workspaces/${workspace?._id}`);
      } catch (error) {
         console.error('Failed to delete channel', error);
      }
   };

   return (
      <>
         <ConfirmDialog />

         <div className="bg-white border-b h-[50px] flex items-center justify-between px-4 overflow-hidden">
            {/* Left Section: Channel name + Edit button */}
            <div className="flex flex-col sm:items-center  sm:flex-row sm:gap-x-2 ">
               <div className="flex items-center gap-x-2">
                  {/* Show channel name */}
                  <span className="text-lg font-semibold"># {name}</span>

                  {/* Only show dropdown if admin */}
                  {isLoggedInUserAdminOfWorkspace && (
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="ghost" className="p-0 m-0 cursor-pointer">
                              <FaChevronCircleDown className="size-3 " />
                           </Button>
                        </DialogTrigger>

                        <DialogContent>
                           <DialogHeader>
                              <DialogTitle># {name}</DialogTitle>
                           </DialogHeader>

                           <div className="px-4 pb-4 flex flex-col gap-y-2">
                              <DialogTrigger asChild>
                                 <div
                                    className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100"
                                    onClick={() => setEditOpen(true)}
                                 >
                                    <div className="flex items-center justify-between">
                                       <p className="text-sm font-semibold">Channel name</p>
                                       <div className="flex items-center gap-1 underline text-sm font-semibold">
                                          <Pencil className="size-4" />
                                          <span>Edit</span>
                                       </div>
                                    </div>
                                    <p className="text-sm">{name}</p>
                                 </div>
                              </DialogTrigger>

                              <DialogTrigger asChild>
                                 <Button
                                    variant="destructive"
                                    className="justify-center gap-2"
                                    onClick={handleDelete}
                                 >
                                    <TrashIcon className="size-4" />
                                    Delete Channel
                                 </Button>
                              </DialogTrigger>
                           </div>
                        </DialogContent>
                     </Dialog>
                  )}
               </div>

               {/* Mobile view: online users under channel name */}
               {onlineUsers > 1 && (
                  <div className="sm:hidden flex items-center gap-1 text-xs text-gray-500 pl-3">
                     <span className="text-green-500">{onlineUsers - 1} online</span>
                  </div>
               )}
            </div>

            {/* Right Section (Desktop only): online users */}
            {onlineUsers > 1 && (
               <div className="hidden sm:flex items-center gap-1  text-gray-600">
                  <span className="text-green-500">{onlineUsers - 1} online</span>
               </div>
            )}

            {/* Edit Modal */}
            <EditChannelModal
               ChannelName={name}
               channelId={channelId}
               editOpen={editOpen}
               setEditOpen={setEditOpen}
               workspaceId={workspace?._id}
            />
         </div>
      </>
   );
};
