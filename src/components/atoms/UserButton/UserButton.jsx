import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useToast } from '@/hooks/use-toast';
import { HomeIcon, LogOutIcon, PencilIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserButton = () => {
   const { auth, logout } = useAuth();
   const { toast } = useToast();

   const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

   function openWorkspaceCreateModal() {
      setOpenCreateWorkspaceModal(true);
   }
   const navigate = useNavigate();

   async function handleLogout() {
      await logout();
      toast({
         title: 'Successfully signed out',
         type: 'success'
      });
      navigate('/');
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="outline-none relative cursor-pointer">
            <Avatar className="size-15 hover:opacity-65 transition border">
               <AvatarImage src={auth?.user?.avatar} />
               <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate('/')}>
               <HomeIcon className="size-4 mr-2 h-10 " />
               <span className="cursor-pointer">Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openWorkspaceCreateModal}>
               <PencilIcon className="size-4 mr-2 h-10" />
               <span className="cursor-pointer">Create Workspace </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/profile/${auth?.user?.username}`)}>
               <UserIcon className="size-4 mr-2 h-10" />
               <span className="cursor-pointer">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
               <LogOutIcon className="size-4 mr-2 h-10" />
               <span className="cursor-pointer">Logout</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
