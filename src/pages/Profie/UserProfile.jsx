import '../../App.css';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/context/useAuth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import slack from '../../../public/Slack_Logo.jpg';

export const UserProfile = () => {
   const navigate = useNavigate();
   const { auth } = useAuth();

   return (
      <div className="min-h-screen bg-slack text-white flex flex-col">
         {/* Header */}
         <header className="w-full px-6 py-4 border-b border-white">
            <div
               onClick={() => navigate('/')}
               className="flex items-center space-x-2 cursor-pointer"
            >
               <img src={slack} alt="Slack Logo" className="h-8 w-8" />
               <h1 className="text-2xl font-bold text-white">Slack</h1>
            </div>
         </header>

         {/* Profile Card with animated border */}
         <main className="flex-1 flex justify-center items-center px-4">
            <div className="animate-border">
               <div className="bg-slack-medium text-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                  <h2 className="text-3xl font-bold mb-6">My Profile</h2>

                  <div className="flex justify-center mb-4">
                     <Avatar className="w-24 h-24 border-4 border-white rounded-full">
                        <AvatarImage
                           src={auth?.user?.avatar}
                           alt="User Avatar"
                           className="object-cover"
                        />
                        <AvatarFallback className="bg-sky-500 text-white text-2xl font-bold">
                           {auth?.user?.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                  </div>

                  <p className="text-lg font-semibold mb-2">
                     <span className="text-gray-300">Name:</span> {auth?.user?.username}
                  </p>
                  <p className="text-lg font-semibold">
                     <span className="text-gray-300">Email:</span> {auth?.user?.email}
                  </p>
               </div>
            </div>
         </main>

         {/* Footer */}
         <footer className="text-center py-6 text-gray-300 text-sm">
            © {new Date().getFullYear()} Slack. Built with ❤️.
         </footer>
      </div>
   );
};
