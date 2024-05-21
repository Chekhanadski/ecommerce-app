import { proxy } from 'valtio';

const state = proxy({
  isAuthorized: false
});

export default state;
