import { PromoCode } from '../store/types/promo';
import { generateUUID, getAnonymousToken } from './auth';

const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/e-commerce-project';

async function getToken(): Promise<string> {
  let token = sessionStorage.getItem('accessToken');
  if (!token) {
    token = sessionStorage.getItem('anonymousAccessToken');
    if (!token) {
      let anonymousId = sessionStorage.getItem('anonymousId');
      if (!anonymousId) {
        anonymousId = generateUUID();
        sessionStorage.setItem('anonymousId', anonymousId);
      }
      token = await getAnonymousToken(anonymousId);
      if (token) {
        sessionStorage.setItem('anonymousAccessToken', token);
      } else {
        throw new Error('Failed to get an anonymous token');
      }
    }
  }
  return token;
}

export default async function getActivePromoCodes(): Promise<string[]> {
  const token = await getToken();
  const response = await fetch(`${BASE_URL}/discount-codes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get promo codes: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.results.map((promoCode: PromoCode) => promoCode.code);
}
