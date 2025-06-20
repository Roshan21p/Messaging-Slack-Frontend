import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import { toast } from 'sonner';

import { useJoinWorkspace } from '@/hooks/apis/workspaces/useJoinWorkspace';
import { useAuth } from '@/hooks/context/useAuth';

import { Button } from '@/components/ui/button';

export const JoinPage = () => {
   const { workspaceId } = useParams();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const { auth } = useAuth();

   const { joinWorkspaceMutation } = useJoinWorkspace(workspaceId);

   const [autoJoinAttempted, setAutoJoinAttempted] = useState(false);

   const joinCodeFromURL = searchParams.get('code');

   async function handleJoinWorkspace(joinCode) {
      try {
         await joinWorkspaceMutation(joinCode);
         navigate(`/workspaces/${workspaceId}`);
      } catch (error) {
         console.log('Error in join workspace', error);
      }
   }

   useEffect(() => {
      if (!auth?.token) {
         // Store invite info to join later
         localStorage.setItem(
            'pendingJoin',
            JSON.stringify({
               workspaceId,
               joinCode: joinCodeFromURL
            })
         );
         navigate('/auth/signin');
         toast('Please login to Join the Workspace');
         return;
      }

      if (joinCodeFromURL && !autoJoinAttempted) {
         setAutoJoinAttempted(true);
         handleJoinWorkspace(joinCodeFromURL);
      }
   }, [auth, joinCodeFromURL, autoJoinAttempted]);

   return (
      <div
         className="h-screen w-full flex items-center justify-center px-6"
         style={{
            background: 'linear-gradient(135deg, #5c3b58, #5e2c5f, #481349)',
            color: 'white'
         }}
      >
         <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-10 max-w-md w-full flex flex-col items-center gap-y-6">
            <div className="text-center">
               <h1 className="text-3xl font-bold mb-2 text-white">Join Workspace</h1>
               {joinCodeFromURL ? (
                  <p className="text-sm text-gray-200">
                     Using invite code: <span className="font-semibold">{joinCodeFromURL}</span>
                  </p>
               ) : (
                  <p className="text-sm text-gray-200">
                     Enter the code you received to join the workspace
                  </p>
               )}
            </div>

            {!joinCodeFromURL && (
               <VerificationInput
                  onComplete={handleJoinWorkspace}
                  length={6}
                  placeholder=""
                  autoFocus
                  classNames={{
                     container: 'flex gap-x-3 justify-center',
                     character:
                        'w-12 h-12 text-xl text-white bg-[#5e2c5f] border border-white/30 rounded-md flex items-center justify-center transition focus:outline-none focus:border-white focus:ring-1 focus:ring-white',
                     characterInactive: 'bg-white/10',
                     characterFilled: 'bg-white text-[#5e2c5f] font-bold',
                     characterSelected: 'bg-white text-[#5e2c5f]'
                  }}
               />
            )}

            <div className="flex gap-4 mt-4">
               <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition"
               >
                  <Link to={`/workspaces/${workspaceId}`}>Back to Workspace</Link>
               </Button>
            </div>
         </div>
      </div>
   );
};
