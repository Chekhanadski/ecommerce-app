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
    if (error instanceof Error) {
      throw new Error(`An error occurred while getting the access token: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while getting the access token');
    }
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
      const errorData = await response.json();
      if (errorData.errors && errorData.errors.length > 0) {
        const error = errorData.errors[0];
        if (
          error.code === 'DuplicateField' &&
          error.message.includes('There is already an existing customer with the provided email.')
        ) {
          return 'Email already exists. Please log in or use another email.';
        }
        if (error.code === 'InvalidInput') {
          return 'Invalid input. Please check your data and try again.';
        }
        if (response.status === 500) {
          return 'A server-side error occurred. Please try again later.';
        }
      }
      return 'An error occurred. Please try again later.';
    }

    const responseData = await response.json();

    if (responseData) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return false;
  }
}