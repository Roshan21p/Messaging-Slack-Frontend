import { useLocation, useNavigate } from 'react-router-dom';

import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';

import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { SidebarButton } from '@/components/molecules/SidebarButton/SidebarButton';

import { WorkspaceSwitcher } from './WorkspaceSwitcher';

export const WorkspaceSidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const isDirectMessagePath = location.pathname.startsWith('/direct-message');

   const { workspaces, isSuccess } = useFetchWorkspace({
      enabled: isDirectMessagePath
   });

   return (
      <aside className="w-[70px] h-full bg-slack-dark flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]">
         {!isDirectMessagePath && <WorkspaceSwitcher />}

         {isDirectMessagePath && isSuccess && workspaces?.length > 0 && (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl cursor-pointer rounded-md">
                     {workspaces[0]?.name?.charAt(0).toUpperCase() || 'W'}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  {workspaces.map((workspace) => (
                     <DropdownMenuItem
                        key={workspace._id}
                        onClick={() => navigate(`/workspaces/${workspace._id}`)}
                        className="cursor-pointer"
                     >
                        {workspace.name}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         )}
         <SidebarButton Icon={HomeIcon} label="Home" onClick={() => navigate('/')} />

         <SidebarButton
            Icon={MessageSquareIcon}
            label="DMs"
            onClick={() => navigate('/direct-message')}
         />

         <SidebarButton Icon={BellIcon} label="Notifications" />

         <SidebarButton Icon={MoreHorizontalIcon} label="More" />

         <div className="flex flex-col items-center justify-center mt-auto mb-5 gap-y-1">
            <UserButton />
         </div>
      </aside>
   );
};
