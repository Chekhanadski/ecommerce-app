import { proxy } from 'valtio';

const state = proxy({
  isAuthorized: false,
  logout() {
    this.isAuthorized = false;
    sessionStorage.setItem('accessToken', '');
    sessionStorage.removeItem('customerId');
  }
});

export default state;
