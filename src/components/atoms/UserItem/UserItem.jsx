import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useLocation, useNavigate } from 'react-router-dom';

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

export const UserItem = ({ id, username = 'member', variant = 'default', image }) => {
   const { currentWorkspace: workspace } = useCurrentWorkspace();
   const navigate = useNavigate();
   const location = useLocation();
   const isDirectMessagePath = location.pathname.startsWith('/direct-message');

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
         <Avatar>
            <AvatarImage src={image} className="rounded-md" />
            <AvatarFallback className="rounded-md bg-sky-500 text-white">
               {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
         </Avatar>
         <span>{username}</span>
      </Button>
   );
};
