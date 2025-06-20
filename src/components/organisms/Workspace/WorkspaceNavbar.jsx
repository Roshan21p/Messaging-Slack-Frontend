import { InfoIcon, SearchIcon } from 'lucide-react';

import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

import { Button } from '@/components/ui/button';

export const WorkspaceNavbar = () => {
   const { currentWorkspace: workspace } = useCurrentWorkspace();

   return (
      <nav className="flex items-center justify-center h-10 p-1.5 bg-slack-dark">
         <div className="flex-1" />
         <div>
            <Button
               size="sm"
               className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
            >
               <SearchIcon className="size-5 text-white mr-2" />
               <span className="text-white text-xs">Search {workspace?.name || 'Workspace'}</span>
            </Button>
         </div>

         <div className="ml-auto flex flex-1 items-center justify-end">
            <Button variant="transparent" size="iconSm">
               <InfoIcon className="size-5 text-white" />
            </Button>
         </div>
      </nav>
   );
};
