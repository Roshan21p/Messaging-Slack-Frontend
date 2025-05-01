import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
   const { isFetching, workspaces, error } = useFetchWorkspace();

   const navigate = useNavigate();

   const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

   useEffect(() => {
      
      if (isFetching) return;

      console.log('Workspaces downloaded is', workspaces, error);

      if (workspaces?.length === 0 || !workspaces) {
         setOpenCreateWorkspaceModal(true);
      } else {
         navigate(`/workspaces/${workspaces[0]?._id}`);
      }
   }, [isFetching, workspaces, navigate]);

   return (
      <div className="h-[100vh] flex flex-col items-center justify-center bg-slack">
         <h1 className="text-3xl">Home</h1>
         <UserButton />
      </div>
   );
};
