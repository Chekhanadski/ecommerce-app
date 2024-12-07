import {
  MainPage,
  CatalogPage,
  LoginPage,
  RegistrationPage,
  AccountPage,
  AddressPage,
  ProductPage,
  NotFoundPage,
  CartPage,
  About
} from '.';

const ROUTES = [
  { path: '/', element: MainPage },
  { path: '/catalog', element: CatalogPage },
  { path: '/login', element: LoginPage },
  { path: '/register', element: RegistrationPage },
  { path: '/account', element: AccountPage },
  { path: '/account/address', element: AddressPage },
  { path: '/catalog/:productId', element: ProductPage },
  { path: '/cart', element: CartPage },
  { path: '/about', element: About },
  { path: '*', element: NotFoundPage }
];

export default ROUTES;
