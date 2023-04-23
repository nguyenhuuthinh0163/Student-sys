import { useSelector } from 'react-redux';
import { selectAccessToken } from './redux/authSlice';
import App from './App';
import Login from './pages/User/Login';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import Register from './pages/User/Register';
import { useEffect } from 'react';

interface authLoaderArgs extends LoaderFunctionArgs {
  redirectPath: string;
  accessToken: string;
}

export default function Router() {
  const accessToken = useSelector(selectAccessToken);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      loader: async () => {
        if (accessToken === null) {
          throw redirect('login');
        }
        return accessToken;
      },
    },
    {
      path: 'login',
      element: <Login />,
      loader: async () => {
        if (accessToken !== null) {
          throw redirect('/');
        }
        return '';
      },
    },
    {
      path: 'register',
      element: <Register />,
      loader: async () => {
        if (accessToken !== null) {
          throw redirect('/');
        }
        return '';
      },
    },
  ]);
  return <RouterProvider router={router} />;
}
