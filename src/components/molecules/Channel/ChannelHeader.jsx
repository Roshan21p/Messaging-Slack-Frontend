import { EditChannelModal } from '@/components/organisms/Modals/EditChannelModal';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ChannelHeader = ({ name }) => {
   const { channelId } = useParams();
   const [editOpen, setEditOpen] = useState(false);

   const { currentWorkspace: workspace } = useCurrentWorkspace();
   const workspaceMembers = workspace?.members;
   const { auth } = useAuth();

   const isLoggedInUserAdminOfWorkspace = workspaceMembers?.some(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'admin'
   );

   return (
      <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
         {/* Show channel name for all users */}
         <span className="text-lg font-semibold"># {name}</span>

         {/* Only show dropdown if admin */}
         {isLoggedInUserAdminOfWorkspace && (
            <Dialog>
               <DialogTrigger asChild>
                  <Button variant="ghost" className="ml-2 cursor-pointer">
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
                              <p className="text-sm font-semibold underline">Edit</p>
                           </div>
                           <p className="text-sm">{name}</p>
                        </div>
                     </DialogTrigger>
                  </div>
               </DialogContent>
            </Dialog>
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
   );
};
