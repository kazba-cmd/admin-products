import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from 'layouts/dashboard';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
//

// Прочее
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Users from './pages/Users';
import Department from './pages/Department';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        //
        { path: '/', element: <Navigate to="/control/users" replace /> },
        { path: 'control/users', element: <Users /> },
        { path: 'control/department', element: <Department /> },
        { path: 'user', element: <User /> },
        { path: 'blog', element: <Blog /> },
        { path: '404', element: <NotFound /> }
      ]
    },
    {
      path: '/auth',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
