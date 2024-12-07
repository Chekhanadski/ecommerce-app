import { getAnonymousToken, generateUUID } from '../api/auth';

const logout = async (setStore, setIsOpen) => {
  sessionStorage.removeItem('customerId');
  sessionStorage.removeItem('accessToken');

  let anonymousId = sessionStorage.getItem('anonymousId');
  if (!anonymousId) {
    anonymousId = generateUUID();
    sessionStorage.setItem('anonymousId', anonymousId);
  }

  try {
    const anonymousAccessToken = await getAnonymousToken(anonymousId);
    sessionStorage.setItem('anonymousAccessToken', anonymousAccessToken);
  } catch (error) {
    throw Error(`Error getting anonymous token: ${error.message}`);
  }

  setStore((prevStore) => ({ ...prevStore, isAuthorized: false, cartItemCount: 0 }));
  setIsOpen(false);
};

export default logout;
