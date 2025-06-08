import { CreateChannelModal } from '@/components/molecules/CreateChannelModal/CreateChannelModal';
import { CreateWorkspaceModal } from '@/components/molecules/CreateWorkSpaceModal/CreateWorkspaceModal';
import { WorkspaceAddMemberModal } from '@/components/molecules/Workspace/WorkspaceAddMemberModal';
import { WorkspacePreferencesModal } from '@/components/molecules/Workspace/WorkspacePreferencesModal';
import { useAuth } from '@/hooks/context/useAuth';

export const Modals = () => {
   const { auth } = useAuth();

   const isLoggedIn = !!auth.token;
   return (
      <>
         {isLoggedIn && (
            <>
               <CreateWorkspaceModal />
               <WorkspacePreferencesModal />
               <CreateChannelModal />
               <WorkspaceAddMemberModal />
            </>
         )}
      </>
   );
};
