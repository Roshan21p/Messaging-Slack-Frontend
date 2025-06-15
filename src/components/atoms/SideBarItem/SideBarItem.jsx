import { Button } from '@/components/ui/button';
import { useMarkMessageAsRead } from '@/hooks/apis/MessageStatus/useMarkMessageAsRead';
import { useAuth } from '@/hooks/context/useAuth';
import { useMessageStatus } from '@/hooks/context/useMessageStatus';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

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
   variant
}) => {
   const { workspaceId } = useParams();
   const navigate = useNavigate();
   const [hasMarkedRead, setHasMarkedRead] = useState(false);
   const queryClient = useQueryClient();


   const { markMessageAsReadMutation } = useMarkMessageAsRead();
   const { unreadMessageCount } = useMessageStatus();
   const { auth } = useAuth();

   const unreadCount =
      unreadMessageCount?.find((item) => item?.channelId?._id === id)?.unreadCount || 0;

   const handleClick = async () => {
       if(unreadCount > 0  && !hasMarkedRead){
         await markMessageAsReadMutation({ workspaceId, channelId: id })
        setHasMarkedRead(true); // Prevent duplicate marking
         queryClient.refetchQueries(['unreadMessageCount', workspaceId, auth?.user?._id])
         navigate(`/workspaces/${workspaceId}/channels/${id}`);
      }

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
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
               <Icon className="size-3.5 mr-1" />
               <span className="text-sm">{label}</span>
            </div>

            {unreadCount > 0 && (
               <span className="ml-auto bg-red-500 text-white text-xs px-1 py-1 rounded-full min-w-[25px] text-center">
                  {unreadCount}
               </span>
            )}
         </div>
      </Button>
   );
};
