import { proxy } from 'valtio';

const state = proxy({
  isAuthorized: true,
  logout() {
    this.isAuthorized = false;
  }
});

export default state;
