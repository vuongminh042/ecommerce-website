import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import RootRoutes from './routes/routes';
import useLogout from './hooks/Auth/Mutation/useLogout';
import React from 'react';
import { registerLogoutCallback } from './utils/api/axiosIntance';


function App() {
  const router = useRoutes(RootRoutes)
  const logout = useLogout();

  React.useEffect(() => {
      registerLogoutCallback(() => logout());
  }, []);
  return router
}

export default App;
