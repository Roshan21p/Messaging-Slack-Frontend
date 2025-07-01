import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useSocketConnection } from '@/hooks/context/socket/useSocketConnection';
import { useMessageStatus } from '@/hooks/context/useMessageStatus';

import { Button } from '@/components/ui/button';

const sideBarItemVariants = cva(
   'flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden cursor-pointer',
   {
      variants: {
         variant: {
            default: 'text-[#f9edffcc]',
            active: 'text-[#481350] bg-white/90 hover:bg-white/80'
         }
      },
      defaultVariants: 'default'
   }
);

export const SideBarItem = ({
   label,
   id, // channelId
   icon: Icon,
   variant,
   badgeCount = 0
}) => {
   const { workspaceId } = useParams();
   const navigate = useNavigate();

   const hasMarkedReadRef = useRef({}); // track marked state per channel

   const { unreadMessageCount, resetChannelUnreadCount } = useMessageStatus();
   const { socket } = useSocketConnection();

   const [localUnread, setLocalUnread] = useState(
      unreadMessageCount?.find((item) => item?.channelId?._id === id)?.unreadCount || 0
   );

   console.log('siderBar localUnread', unreadMessageCount, localUnread);

   useEffect(() => {
      const count =
         unreadMessageCount?.find((item) => item?.channelId?._id === id)?.unreadCount || 0;
      setLocalUnread(count);
   }, [unreadMessageCount, id]);

   // Automatically mark messages as read if this is the active channel
   useEffect(() => {
      if (variant === 'active' && localUnread > 0 && !hasMarkedReadRef.current[id]) {
         hasMarkedReadRef.current[id] = true;
         resetChannelUnreadCount(id);
         socket?.emit('MarkMessagesAsRead', { workspaceId, channelId: id }, (data) => {
            console.log('✅ Marked as read from useEffect:', id, data);
         });
         console.log('trigger');
      }
   }, [variant, id, localUnread, workspaceId, socket, resetChannelUnreadCount]);

   const handleClick = async () => {
      if (id === 'threads' || id === 'drafts') {
         navigate(`/workspaces/${workspaceId}`);
      } else if (id === 'all-dms' || id === 'unread-dms' || id === 'mentions') {
         navigate('/direct-message');
      } else {
         navigate(`/workspaces/${workspaceId}/channels/${id}`);
      }
   };

   return (
      <Button
         variant="transparent"
         size="sm"
         className={cn(sideBarItemVariants({ variant }))}
         onClick={handleClick}
      >
         <div className="flex items-center justify-between w-full h-full">
            <div className="flex items-center gap-1.5">
               <Icon className="size-3.5 mr-1" />
               <span className="text-sm">{label}</span>
            </div>

            {badgeCount > 0 && (
               <span className="ml-auto bg-red-500 text-white text-xs px-1 py-1 rounded-full min-w-[25px] text-center">
                  {badgeCount}
               </span>
            )}

            {localUnread > 0 && (
               <span className="ml-auto bg-red-500 text-white text-xs px-1 py-1 rounded-full min-w-[25px] text-center">
                  {localUnread}
               </span>
            )}
         </div>
      </Button>
   );
};
