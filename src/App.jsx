import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppContextProvider } from './context/AppContextProvider';
import { AppRoutes } from './Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
