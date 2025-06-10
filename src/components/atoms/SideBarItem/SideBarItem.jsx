import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Link, useNavigate, useParams } from 'react-router-dom';

const sideBarItemVariants = cva(
   'flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden',
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

   const handleClick = () => {
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
         <div className="flex items-center gap-1.5">
            <Icon className="size-3.5 mr-1" />
            <span className="text-sm">{label}</span>
         </div>
      </Button>
   );
};
