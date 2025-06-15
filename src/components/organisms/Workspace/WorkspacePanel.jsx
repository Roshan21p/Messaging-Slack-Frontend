import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/UserItem';
import { WorkspacePanelHeader } from '@/components/molecules/Workspace/WorkspacePanelHeader';
import { WorkspacePanelSection } from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import {
   AlertTriangleIcon,
   HashIcon,
   Loader,
   MessageSquareTextIcon,
   SendHorizonalIcon
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const WorkspacePanel = () => {
   const { workspaceId, id, channelId } = useParams();
   const navigate = useNavigate();

   const { isFetching, isSuccess, workspace, error } = useGetWorkspaceById(workspaceId);
   const { setCurrentWorkspace } = useCurrentWorkspace();
   const { setOpenCreateChannelModal } = useCreateChannelModal();
   const { setOpenDmModal } = useCurrentWorkspace();
   const { auth, logout } = useAuth();

   useEffect(() => {
      if (!isFetching && !isSuccess && error) {
         if (error.status === 403) {
            logout();
            navigate('/auth/signin');
         }
      }

      if (workspace) {
         setCurrentWorkspace(workspace);
      }
   }, [workspace, setCurrentWorkspace, isFetching, error]);

   if (isFetching) {
      return (
         <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
            <Loader className="animate-spin size-6 text-white" />
         </div>
      );
   }

   if (!isSuccess) {
      return (
         <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
            <AlertTriangleIcon className=" size-6 mx-auto mt-2 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">No Workspaces Found</h2>
            <p className="text-lg text-white mb-6">
               You haven't created any workspaces yet. Start by creating your first one!
            </p>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full bg-slack-medium">
         <WorkspacePanelHeader workspace={workspace} />
         <div className="flex flex-col px-2 mt-2">
            <SideBarItem
               label="Threads"
               icon={MessageSquareTextIcon}
               id="threads"
               variant="active"
            />
            <SideBarItem
               label="Drafts & Sends"
               icon={SendHorizonalIcon}
               id="drafts"
               variant="default"
            />
         </div>
         <WorkspacePanelSection
            label={'Channels'}
            onIconClick={() => {
               setOpenCreateChannelModal(true);
            }}
         >
            {workspace?.channels?.map((channel, index) => {
               return (
                  <SideBarItem
                     key={`${channel._id}-${index}`}
                     label={channel?.name}
                     icon={HashIcon}
                     variant={channelId === channel?._id ? 'active' : 'default'}
                     id={channel?._id}
                  />
               );
            })}
         </WorkspacePanelSection>

         <WorkspacePanelSection
            label="Direct messages"
            onIconClick={() => {
               setOpenDmModal(true);
            }}
         >
            {workspace?.members
               ?.filter((item) => item?.memberId?.username !== auth?.user?.username)
               ?.map((item) => {
                  return (
                     <UserItem
                        key={item?.memberId?._id}
                        username={item?.memberId?.username}
                        id={item?.memberId?._id}
                        variant={id === item?.memberId?._id ? 'active' : 'default'}
                        image={item?.memberId?.avatar}
                     />
                  );
               })}
         </WorkspacePanelSection>
      </div>
   );
};
