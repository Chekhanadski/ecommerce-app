import { proxy } from 'valtio';

const state = proxy({
  isAuthorized: false,
  logout() {
    this.isAuthorized = false;
  }
});

export default state;
