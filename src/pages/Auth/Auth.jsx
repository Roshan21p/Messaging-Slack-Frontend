import { useNavigate } from 'react-router-dom';
import slack from '../../../public/Slack_Logo.jpg';

export const Auth = ({ children }) => {
   const navigate = useNavigate();

   return (
      <div className="min-h-screen bg-slack text-white flex flex-col">
         {/* Header - shared across signin/signup */}
         <header className="w-full px-6 py-4 border-b border-white">
            <div
               onClick={() => navigate('/')}
               className="flex items-center space-x-2 cursor-pointer"
            >
               <img src={slack} alt="Slack Logo" className="h-8 w-8" />
               <h1 className="text-2xl font-bold text-white">Slack</h1>
            </div>
         </header>

         {/* This is where SigninCard or SignupCard will render */}
         <div className="flex-1 flex justify-center items-center px-4">{children}</div>

         <footer className="text-center py-6 text-gray-300 text-sm">
            © {new Date().getFullYear()} Slack. Built with ❤️.
         </footer>
      </div>
   );
};
