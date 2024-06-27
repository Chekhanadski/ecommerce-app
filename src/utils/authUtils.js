import { getAnonymousToken, generateUUID } from '../api/auth';

const logout = async (setStore, setIsOpen) => {
  localStorage.removeItem('customerId');
  localStorage.removeItem('accessToken');

  let anonymousId = localStorage.getItem('anonymousId');
  if (!anonymousId) {
    anonymousId = generateUUID();
    localStorage.setItem('anonymousId', anonymousId);
  }

  try {
    const anonymousAccessToken = await getAnonymousToken(anonymousId);
    localStorage.setItem('anonymousAccessToken', anonymousAccessToken);
  } catch (error) {
    throw Error(`Error getting anonymous token: ${error.message}`);
  }

  setStore((prevStore) => ({ ...prevStore, isAuthorized: false, cartItemCount: 0 }));
  setIsOpen(false);
};

export default logout;
