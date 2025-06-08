import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppContextProvider } from './context/AppContextProvider';
import { AppRoutes } from './Routes';
import { Modals } from './components/organisms/Modals/Modals';

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <AppContextProvider>
            <Modals />
            <AppRoutes />
         </AppContextProvider>
      </QueryClientProvider>
   );
}

export default App;
