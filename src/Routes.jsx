import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/components/molecules/ProtectedRoute/ProtectedRoute';
import { SigninContainer } from '@/components/organisms/Auth/SigninContainer';
import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';

import { DirectMessageLayout } from './pages/DirectMessage/Layout';
import { UserProfile } from './pages/Profie/UserProfile';
import { Channel } from './pages/Workspace/Channel/Channel';
import { DirectMessage } from './pages/Workspace/DirectMessage/DirectMessage';
import { JoinPage } from './pages/Workspace/JoinPage';
import { WorkspaceLayout } from './pages/Workspace/Layout';

import { Auth } from '@/pages/Auth/Auth';
import { Home } from '@/pages/Home/Home';
import { Notfound } from '@/pages/Notfound/Notfound';

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
            path="/profile/:username"
            element={
               <ProtectedRoute>
                  <UserProfile />
               </ProtectedRoute>
            }
         />

         <Route
            path="/workspaces/:workspaceId"
            element={
               <ProtectedRoute>
                  <WorkspaceLayout />
               </ProtectedRoute>
            }
         >
            {/* Nested routes under workspace layout */}
            <Route path="channels/:channelId" element={<Channel />} />
            <Route path="members/:id/:username" element={<DirectMessage />} />
         </Route>

         <Route
            path="/direct-message"
            element={
               <ProtectedRoute>
                  <DirectMessageLayout />
               </ProtectedRoute>
            }
         >
            {/* Nested routes under Direct message layout */}
            <Route path=":id/:username" element={<DirectMessage />} />
         </Route>

         <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />

         <Route path="/*" element={<Notfound />} />
      </Routes>
   );
};
