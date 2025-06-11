import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/UserItem';
import { Button } from '@/components/ui/button';
import { useFetchAllUsers } from '@/hooks/apis/auth/useFetchAllUsers';
import { useAuth } from '@/hooks/context/useAuth';

import { AlertTriangleIcon, BookmarkIcon, Loader, SendHorizonalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const DirectMessagePanel = () => {
   const { id } = useParams();

   const { isFetching, isSuccess, isError, error, userDetails } = useFetchAllUsers();
   const { auth, logout } = useAuth();
   const [open, setOpen] = useState(false);

   console.log('error', error);

   useEffect(() => {
      if (isError && error?.status === 403) {
         logout();
         return;
      }
   }, [isError, error]);

   if (isFetching) {
      return (
         <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
            <Loader className="animate-spin size-6 text-white" />
         </div>
      );
   }

   if (isError) {
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
               label="Unread"
               icon={BookmarkIcon}
               id="unread-dms"
               variant="active"
               badgeCount={5}
            />
            <SideBarItem
               label="Mentions"
               icon={SendHorizonalIcon}
               id="mentions"
               variant="default"
            />
         </div>

         <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
               <Button
                  onClick={() => setOpen(!open)}
                  variant="transparent"
                  className="p-0.5 text-sm size-6 text-[#f9edffcc] cursor-pointer"
               >
                  {open ? <FaCaretDown className="size-4" /> : <FaCaretRight className="size-4" />}
               </Button>
               <Button
                  variant="transparent"
                  size="sm"
                  className="group px-1.5 text-sm text-[#f9edffcc] h-[30px] justify-start items-center overflow-hidden"
               >
                  <span>Direct messages</span>
               </Button>
            </div>
            {open &&
               userDetails
                  ?.filter((user) => user?.username !== auth?.user?.username)
                  ?.map((user) => {
                     return (
                        <UserItem
                           key={user?._id}
                           username={user?.username}
                           id={user?._id}
                           variant={id === user?._id ? 'active' : 'default'}
                           image={user?.avatar}
                        />
                     );
                  })}
         </div>
      </div>
   );
};
