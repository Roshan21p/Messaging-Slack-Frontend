import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { LucideLoader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
   const { isFetching, workspaces, error, isError } = useFetchWorkspace();

   const navigate = useNavigate();

   const { logout } = useAuth();

   const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

   useEffect(() => {
      if (!isFetching) {
         if (isError && error?.status === 403) {
            logout();
            navigate('/auth/signin');
         }
         console.log('Workspaces downloaded is', workspaces);

         if (!workspaces || workspaces.length === 0) {
            setOpenCreateWorkspaceModal(true);
         } else {
            navigate(`/workspaces/${workspaces[0]?._id}`);
         }
      }
   }, [isFetching, workspaces, navigate, isError]);

   if (isFetching) {
      return (
         <div className="bg-slack h-[100vh] pt-10">
            <LucideLoader2 className="animate-spin mx-auto" />
            <span className="flex items-center justify-center">Loading...</span>
         </div>
      );
   }

   return (
      <div className="h-[100vh] flex flex-col items-center justify-center bg-slack">
         <h1 className="text-3xl">Home</h1>
         <UserButton />
      </div>
   );
};
