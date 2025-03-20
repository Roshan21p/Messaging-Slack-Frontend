import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Auth } from './pages/Auth/Auth';
import { SignupCard } from './components/organisms/Auth/SignupCard';
import { Signincard } from './components/organisms/Auth/SigninCard';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupCard />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <Signincard />
          </Auth>
        }
      />
    </Routes>
  );
}

export default App;
