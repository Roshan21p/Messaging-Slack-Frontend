import { Route, Routes } from 'react-router-dom';
import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';
import { Auth } from '@/pages/Auth/Auth';
import { SigninContainer } from '@/components/organisms/Auth/SigninContainer';
import { Notfound } from '@/pages/Notfound/Notfound';
import { ProtectedRoute } from '@/components/molecules/ProtectedRoute/ProtectedRoute';
import { Home } from '@/pages/Home/Home';
import { WorkspaceLayout } from './pages/Workspace/Layout';
import { JoinPage } from './pages/Workspace/JoinPage';
import { Channel } from './pages/Workspace/Channel/Channel';
import { DirectMessage } from './pages/Workspace/DirectMessage/DirectMessage';
import { DirectMessageLayout } from './pages/DirectMessage/Layout';
import { UserProfile } from './pages/Profie/UserProfile';

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />

         <Route path="/auth" element={<Auth />} />

         <Route
            path="/auth/signup"
            element={
               <Auth>
                  <SignupContainer />
               </Auth>
            }
         />
         <Route
            path="/auth/signin"
            element={
               <Auth>
                  <SigninContainer />
               </Auth>
            }
         />

         <Route
            path="/workspaces/:workspaceId"
            element={
               <ProtectedRoute>
                  <WorkspaceLayout></WorkspaceLayout>
               </ProtectedRoute>
            }
         />

         <Route
            path="/profile/:username"
            element={
               <ProtectedRoute>
                  <UserProfile />
               </ProtectedRoute>
            }
         />

         <Route
            path="/workspaces/:workspaceId/channels/:channelId"
            element={
               <ProtectedRoute>
                  <WorkspaceLayout>
                     <Channel />
                  </WorkspaceLayout>
               </ProtectedRoute>
            }
         />

         <Route
            path="/workspaces/:workspaceId/members/:id/:username"
            element={
               <ProtectedRoute>
                  <WorkspaceLayout>
                     <DirectMessage />
                  </WorkspaceLayout>
               </ProtectedRoute>
            }
         />

         <Route
            path="/direct-message"
            element={
               <ProtectedRoute>
                  <DirectMessageLayout></DirectMessageLayout>
               </ProtectedRoute>
            }
         />

         <Route
            path="/direct-message/:id/:username"
            element={
               <ProtectedRoute>
                  <DirectMessageLayout>
                     <DirectMessage />
                  </DirectMessageLayout>
               </ProtectedRoute>
            }
         />

         <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />

         <Route path="/*" element={<Notfound />} />
      </Routes>
   );
};
