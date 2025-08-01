import { useOutlet } from 'react-router-dom';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { WorkspaceNavbar } from '@/components/organisms/Workspace/WorkspaceNavbar';
import { WorkspacePanel } from '@/components/organisms/Workspace/WorkspacePanel';
import { WorkspaceSidebar } from '@/components/organisms/Workspace/WorkspaceSidebar';

export const WorkspaceLayout = () => {
   const outlet = useOutlet(); // detects if nested route is matched

   return (
      <div className="flex flex-col h-screen">
         <WorkspaceNavbar />
         <div className="flex flex-1 overflow-hidden">
            <WorkspaceSidebar />
            <ResizablePanelGroup direction="horizontal" autoSaveId={'workspace-resize'}>
               <ResizablePanel defaultSize={20} minSize={5} className="bg-slack-medium ">
                  <WorkspacePanel />
               </ResizablePanel>
               <ResizableHandle withHandle />
               <ResizablePanel minSize={20}>
                  {outlet || (
                     <div className="flex h-full items-center justify-center text-gray-500">
                        <div className="text-center px-4 text-xl">
                           Select a channel or direct message to start chatting
                        </div>
                     </div>
                  )}
               </ResizablePanel>
            </ResizablePanelGroup>
         </div>
      </div>
   );
};
