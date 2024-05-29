import MainPage from './MainPage/MainPage';
import CatalogPage from './CatalogPage/CatalogPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import AccountPage from './AccountPage/AccountPage';
import AddressPage from './AddressPage/AddressPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

const ROUTES = [
  { path: '/', element: MainPage },
  { path: '/catalog', element: CatalogPage },
  { path: '/login', element: LoginPage },
  { path: '/register', element: RegistrationPage },
  { path: '/account', element: AccountPage },
  { path: '/account/address', element: AddressPage },
  { path: '*', element: NotFoundPage }
];

export default ROUTES;
