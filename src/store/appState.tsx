import { proxy } from 'valtio';

const state = proxy({
  isAuthorized: false,
  logout() {
    this.isAuthorized = false;
    localStorage.setItem('accessToken', '');
    localStorage.removeItem('customerId');
  }
});

export default state;
