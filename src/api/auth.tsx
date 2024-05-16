import { FormData } from '../store/types/auth';

export async function getAccessToken() {
  try {
    const authResponse = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa('dpVH1yIfwBBTMqhnk6jS8bsZ:Hco86YSJUnoZiE8bhDWlAoU4X48pUEe-')}`
      },
      body: `grant_type=client_credentials&scope=manage_customers:e-commerce-project`
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    return accessToken;
  } catch (error) {
    // console.error('An error occurred while getting the access token:', error);
    return null;
  }
}

export async function signUp(data: FormData) {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch('https://api.europe-west1.gcp.commercetools.com/e-commerce-project/customers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('An error occurred while creating the account');
    }

    const responseData = await response.json();

    if (responseData) {
      return true;
    }
    return false;
  } catch (error) {
    // console.error('An error occurred while creating the account:', error);
    return false;
  }
}
