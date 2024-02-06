import BlankLayout from '@layouts/BlankLayout';
import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Orders from '@pages/Orders';
import PaymentPage from '@pages/PaymentPage';
import Register from '@pages/Register';
import TicketDetail from '@pages/TicketDetail';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: BlankLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: BlankLayout,
  },
  {
    path: '/ticket/:id',
    name: 'Ticket Detail',
    protected: false,
    component: TicketDetail,
    layout: MainLayout,
  },
  {
    path: '/ticket/:id/pay',
    name: 'Ticket Payment',
    protected: true,
    component: PaymentPage,
    layout: MainLayout,
  },
  {
    path: '/orders',
    name: 'Orders',
    protected: true,
    component: Orders,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
