import BlankLayout from '@layouts/BlankLayout';
import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import PaymentPage from '@pages/PaymentPage';
import Register from '@pages/Register';
import TicketDetail from '@pages/TicketDetail';
import Bookings from '@pages/Bookings';
import TicketCreation from '@pages/TicketCreation';
import Coupons from '@pages/Coupons';
import Profile from '@pages/Profile';

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
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
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
    path: '/bookings',
    name: 'Bookings',
    protected: true,
    component: Bookings,
    layout: MainLayout,
  },
  {
    path: '/ticketcreation',
    name: 'Ticket Creation',
    protected: true,
    component: TicketCreation,
    layout: MainLayout,
  },
  {
    path: '/ticketcreation/:id',
    name: 'Ticket Creation Edit',
    protected: true,
    component: TicketCreation,
    layout: MainLayout,
  },
  {
    path: '/coupons',
    name: 'Coupons',
    protected: true,
    component: Coupons,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
