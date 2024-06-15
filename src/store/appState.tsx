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
      console.log('Generated anonymousId:', anonymousId);
      localStorage.setItem('anonymousId', anonymousId);

      getAnonymousToken(anonymousId)
        .then((newAnonymousAccessToken) => {
          console.log('Received new anonymous access token:', newAnonymousAccessToken);
          localStorage.setItem('anonymousAccessToken', newAnonymousAccessToken);
        })
        .catch((error) => {
          console.error('Error getting anonymous token:', error);
        });
    }
  }
});

export default state;
