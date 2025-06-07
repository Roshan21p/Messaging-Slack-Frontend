import { CreateChannelModal } from '@/components/molecules/CreateChannelModal/CreateChannelModal';
import { CreateWorkspaceModal } from '@/components/molecules/CreateWorkSpaceModal/CreateWorkspaceModal';
import { WorkspaceAddMemberModal } from '@/components/molecules/Workspace/WorkspaceAddMemberModal';
import { WorkspacePreferencesModal } from '@/components/molecules/Workspace/WorkspacePreferencesModal';

export const Modals = () => {
   return (
      <>
         <CreateWorkspaceModal />
         <WorkspacePreferencesModal />
         <CreateChannelModal />
         <WorkspaceAddMemberModal />
      </>
   );
};
