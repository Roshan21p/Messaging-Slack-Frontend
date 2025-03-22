import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useEffect } from 'react';

export const Home = () => {

  const { isFetching, workspaces} = useFetchWorkspace();

  useEffect(() => {
    if(isFetching) return;

    console.log('Workspaces downloaded is', workspaces);

    if(workspaces?.data?.length === 0 || !workspaces){
      console.log('No workspaces found, creating one');
    }
    
  },[isFetching, workspaces]);
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-slack">
      <h1 className="text-3xl">Home</h1>
      <UserButton />
    </div>
  );
};
