import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/UserItem';
import { WorkspacePanelSection } from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useFetchAllUsers } from '@/hooks/apis/auth/useFetchAllUsers';
import { useAuth } from '@/hooks/context/useAuth';

import {
   AlertTriangleIcon,
   BookmarkIcon,
   Loader,
   MessageSquareTextIcon,
   SendHorizonalIcon
} from 'lucide-react';

export const DirectMessagePanel = () => {
   const { isFetching, isSuccess, isError, error, userDetails } = useFetchAllUsers();
   const { auth } = useAuth();

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
            <AlertTriangleIcon className="size-6 mx-auto mt-2 text-red-600" />
            <h2 className="text-xl font-bold text-white mb-2">Error Loading Users</h2>
            <p className="text-sm text-gray-300">Couldn't load user list. Please try again.</p>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full bg-slack-medium">
         <div className="flex flex-col px-2 mt-2">
            <SideBarItem
               label="All DMs"
               icon={MessageSquareTextIcon}
               id="all-dms"
               variant="active"
            />
            <SideBarItem
               label="Unread"
               icon={BookmarkIcon}
               id="unread-dms"
               variant="default"
               badgeCount={5}
            />
            <SideBarItem
               label="Mentions"
               icon={SendHorizonalIcon}
               id="mentions"
               variant="default"
            />
         </div>

         <WorkspacePanelSection label="Direct messages">
            {userDetails
               ?.filter((user) => user?.username !== auth?.user?.username)
               ?.map((user) => {
                  return (
                     <UserItem
                        key={user?._id}
                        username={user?.username}
                        id={user?._id}
                        variant="active"
                        image={user?.avatar}
                     />
                  );
               })}
         </WorkspacePanelSection>
      </div>
   );
};
