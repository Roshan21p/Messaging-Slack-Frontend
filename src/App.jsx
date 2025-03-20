import { Route, Routes } from 'react-router-dom';
import { Auth } from '@/pages/Auth/Auth';
import { Notfound } from '@/pages/Notfound/Notfound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';
import { SigninContainer } from '@/components/organisms/Auth/signinContainer';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
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

       <Route path="/home" element={<Auth><h1>Home</h1></Auth>} />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
