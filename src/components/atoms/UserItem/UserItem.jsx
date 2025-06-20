import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useSocketConnection } from '@/hooks/context/socket/useSocketConnection';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useMessageStatus } from '@/hooks/context/useMessageStatus';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const userItemVariants = cva(
   'flex items-center gap-1.5 justify-start font-normal h-9 px-4 mt-2 text-sm cursor-pointer',
   {
      variants: {
         variant: {
            default: 'text-[#f9edffcc]',
            active: 'text-[#481350] bg-white/90 hover:bg-white/80'
         }
      },
      defaultVariants: {
         variant: 'default'
      }
   }
);

export const UserItem = ({ id, username = 'member', variant, image, roomId }) => {
   const { currentWorkspace: workspace } = useCurrentWorkspace();
   const { dmUnreadMessageCount, resetDmUnreadCount } = useMessageStatus();
   const hasMarkedReadRef = useRef({}); // track marked state per channel
   const { socket } = useSocketConnection();

   const navigate = useNavigate();
   const location = useLocation();

   const [localUnread, setLocalUnread] = useState(
      dmUnreadMessageCount?.find((item) => item?.roomId === roomId)?.unreadCount || 0
   );

   const isDirectMessagePath = location.pathname.startsWith('/direct-message');

   console.log('userItem localUnread', dmUnreadMessageCount, localUnread);

   useEffect(() => {
      const count = dmUnreadMessageCount?.find((item) => item?.roomId === roomId)?.unreadCount || 0;
      setLocalUnread(count);
   }, [dmUnreadMessageCount, id, roomId]);

   // Automatically mark messages as read if this is the active channel
   useEffect(() => {
      if (variant === 'active' && localUnread > 0 && !hasMarkedReadRef.current[id]) {
         hasMarkedReadRef.current[id] = true;
         resetDmUnreadCount(roomId);
         socket?.emit('MarkMessagesAsRead', { workspaceId: workspace?._id, roomId }, (data) => {
            console.log('Marked as read from useEffect:', roomId, data);
         });
         console.log('trigger');
      }
   }, [variant, id, localUnread, workspace?._id, socket, resetDmUnreadCount]);

   const handleClick = () => {
      if (isDirectMessagePath) {
         navigate(`/direct-message/${id}/${username}`);
      } else {
         navigate(`/workspaces/${workspace?._id}/members/${id}/${username}`);
      }
   };

   return (
      <Button
         className={cn(userItemVariants({ variant }))}
         variant="transparent"
         size="sm"
         onClick={handleClick}
      >
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
               <Avatar>
                  <AvatarImage src={image} className="rounded-md" />
                  <AvatarFallback className="rounded-md bg-sky-500 text-white">
                     {username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <span>{username}</span>
            </div>

            {localUnread > 0 && (
               <span className="ml-auto bg-red-500 text-white text-xs px-1 py-1 rounded-full min-w-[25px] text-center">
                  {localUnread}
               </span>
            )}
         </div>
      </Button>
   );
};
