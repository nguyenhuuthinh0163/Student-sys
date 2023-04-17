import { useSelector } from 'react-redux';
import { selectAccessToken } from './redux/authSlice';
import App from './App';
import Login from './pages/User/Login';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Register from './pages/User/Register';

export default function Router() {
  const accessToken = useSelector(selectAccessToken);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      loader: async () => {
        if (!accessToken) {
          throw redirect('/login');
        }
      },
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}
