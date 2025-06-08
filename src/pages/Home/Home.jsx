import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import slack from '../../../public/Slack_Logo.jpg';

import { useAuth } from '@/hooks/context/useAuth';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { UserButton } from '@/components/atoms/UserButton/UserButton';

export const Home = () => {
   const navigate = useNavigate();
   const { auth, logout } = useAuth();

   const { workspaces, isSuccess, isFetching, isError, error } = useFetchWorkspace({
      enabled: !!auth?.token // fetch only if user is logged in
   });

   const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

   useEffect(() => {
      if (isError && error?.status === 403) {
         logout();
      }
   }, [isError, error]);

   const handleWorkspaceClick = (workspaceId) => {
      navigate(`/workspaces/${workspaceId}`);
   };

   return (
      <div className="min-h-screen bg-slack text-white flex flex-col">
         <header className="flex items-center justify-between p-6 whitespace-nowrap">
            <div className="flex items-center space-x-2 flex-shrink-0">
               <img src={slack} alt="Slack Logo" className="h-8 w-8" />
               <h1 className="text-2xl sm:text-3xl pl-2 font-bold truncate">Slack</h1>
            </div>

            {auth?.token ? (
               <UserButton className="flex-shrink-0" />
            ) : (
               <div className="flex space-x-4 flex-shrink-0">
                  <button
                     onClick={() => navigate('/auth/signin')}
                     className="sm:mr-10 text-sm sm:text-xl px-3 py-1 bg-slack-medium hover:bg-slack-dark rounded text-white cursor-pointer"
                  >
                     Sign In
                  </button>
                  <button
                     onClick={() => navigate('/auth/signup')}
                     className="px-3 py-1 text-sm border border-white rounded text-white hover:bg-white hover:text-slack cursor-pointer"
                  >
                     Get Started
                  </button>
               </div>
            )}
         </header>

         <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
               Team Chat. Reinvented.
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8">
               Instantly connect with your team. Share files, send messages, and collaborate — all
               in one workspace.
            </p>

            {!auth?.token && (
               <button
                  onClick={() => navigate('/auth/signup')}
                  className="text-lg px-6 py-3 bg-white text-slack font-semibold rounded hover:bg-gray-200 cursor-pointer"
               >
                  Create Your First Workspace
               </button>
            )}

            {auth?.token && (
               <div className="mt-10 w-full max-w-md">
                  <h3 className="text-2xl mb-4">Your Workspaces</h3>
                  {isFetching && <p>Loading workspaces...</p>}
                  {isSuccess && workspaces.length === 0 && (
                     <>
                        <p>No workspaces found.</p>
                        <button
                           onClick={() => setOpenCreateWorkspaceModal(true)}
                           className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
                        >
                           Create Workspace
                        </button>
                     </>
                  )}
                  {isSuccess &&
                     workspaces.map((ws) => {
                        const displayName = ws.name.charAt(0).toUpperCase() + ws.name.slice(1);
                        return (
                           <div
                              key={ws._id}
                              onClick={() => handleWorkspaceClick(ws._id)}
                              className="cursor-pointer bg-white text-slack p-3 rounded mb-2 hover:bg-gray-100"
                           >
                              {displayName}
                           </div>
                        );
                     })}
               </div>
            )}
         </main>

         <footer className="text-center py-6 text-gray-300 text-sm">
            © {new Date().getFullYear()} Slack. Built with ❤️.
         </footer>
      </div>
   );
};
