import { useNavigate, useParams } from 'react-router-dom';

import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Loader } from 'lucide-react';

import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const WorkspaceSwitcher = () => {
   const navigate = useNavigate();

   const { workspaceId } = useParams();

   const { isFetching, workspace } = useGetWorkspaceById(workspaceId);

   const { isFetching: isFetchingWorkspace, workspaces } = useFetchWorkspace();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl cursor-pointer">
               {isFetching ? (
                  <Loader className="size-5 animate-spin" />
               ) : (
                  workspace?.name?.charAt(0).toUpperCase()
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
               {workspace?.name}
               <span className="text-sm text-muted-foreground">(Active Workspace)</span>
            </DropdownMenuItem>
            {isFetchingWorkspace ? (
               <Loader className="size-5 animate-spin" />
            ) : (
               workspaces?.map((workspace) => {
                  if (workspace._id === workspaceId) {
                     // this is for if current workspace does not create twice
                     return null;
                  }
                  return (
                     <DropdownMenuItem
                        className="cursor-pointer flex-col justify-start items-start"
                        onClick={() => navigate(`/workspaces/${workspace?._id}`)}
                        key={workspace._id}
                     >
                        <p className="truncate">{workspace?.name}</p>
                     </DropdownMenuItem>
                  );
               })
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
