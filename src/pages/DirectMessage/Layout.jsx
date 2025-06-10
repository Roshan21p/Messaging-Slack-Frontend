import { DirectMessagePanel } from '@/components/organisms/DirectMessage/DirectMessagePanel';
import { WorkspaceNavbar } from '@/components/organisms/Workspace/WorkspaceNavbar';
import { WorkspaceSidebar } from '@/components/organisms/Workspace/WorkspaceSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export const DirectMessageLayout = ({ children }) => {
   return (
      <div className="h-[100vh]">
         <WorkspaceNavbar />
         <div className="flex h-[calc(100vh-40px)]">
            <WorkspaceSidebar />
            <ResizablePanelGroup direction="horizontal" autoSaveId={'workspace-resize'}>
               <ResizablePanel defaultSize={20} minSize={5} className="bg-slack-medium">
                  <DirectMessagePanel />
               </ResizablePanel>
               <ResizableHandle withHandle />
               <ResizablePanel minSize={20}>
                  {children ?? (
                     <div className="flex h-full items-center justify-center text-gray-500">
                        <div className="text-center px-4 text-xl">
                           Select a direct message to start chatting
                        </div>
                     </div>
                  )}
               </ResizablePanel>
            </ResizablePanelGroup>
         </div>
      </div>
   );
};
