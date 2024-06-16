import { proxy } from 'valtio';
import { generateUUID, getAnonymousToken } from '../api/auth';

const state = proxy({
  isAuthorized: false,
  logout() {
    this.isAuthorized = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('customerId');

    const anonymousAccessToken = localStorage.getItem('anonymousAccessToken');
    if (!anonymousAccessToken) {
      const anonymousId = generateUUID();
      localStorage.setItem('anonymousId', anonymousId);

      getAnonymousToken(anonymousId)
        .then((newAnonymousAccessToken) => {
          localStorage.setItem('anonymousAccessToken', newAnonymousAccessToken);
        })
        .catch((error) => {
          throw new Error(`Error getting anonymous token: : ${error.message}`);
        });
    }
  }
});

export default state;
