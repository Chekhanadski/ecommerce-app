import { proxy } from 'valtio';
import { generateUUID, getAnonymousToken } from '../api/auth';

const state = proxy({
  isAuthorized: false,
  async logout() {
    this.isAuthorized = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('customerId');

    let anonymousId = localStorage.getItem('anonymousId');
    if (!anonymousId) {
      anonymousId = generateUUID();
      localStorage.setItem('anonymousId', anonymousId);
    }

    try {
      const newAnonymousAccessToken = await getAnonymousToken(anonymousId);
      localStorage.setItem('anonymousAccessToken', newAnonymousAccessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(`Error getting anonymous token: ${error.message}`);
      } else {
        throw Error('An unknown error occurred while getting the anonymous token');
      }
    }
  }
});

export default state;
