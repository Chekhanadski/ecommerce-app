import { FormData, LoginData } from '../store/types/auth';

export const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r % 4) + 8;
    return v.toString(16);
  });

export async function getAnonymousToken(anonymousId: string) {
  try {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/e-commerce-project/anonymous/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa('n51dy-ZHRdmABYqQ_fYHn2Xs:UHjXti3DGgaidqcFvMKYZQbnm0dJRyBN')}`
        },
        body: `grant_type=client_credentials&scope=manage_project:e-commerce-project&anonymous_id=${anonymousId}`
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to get anonymous token');
    }

    return responseData.access_token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while getting the anonymous token: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while getting the anonymous token');
    }
  }
}

export async function getAccessToken() {
  try {
    const authResponse = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa('n51dy-ZHRdmABYqQ_fYHn2Xs:UHjXti3DGgaidqcFvMKYZQbnm0dJRyBN')}`
      },
      body: `grant_type=client_credentials&scopes=manage_project:e-commerce-project`
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

export async function authenticateUser(data: LoginData, accessToken: string) {
  const url = 'https://api.europe-west1.gcp.commercetools.com/e-commerce-project/login/';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return responseData;
}

async function getCustomerToken(email: string, password: string) {
  const response = await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/e-commerce-project/customers/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa('dpVH1yIfwBBTMqhnk6jS8bsZ:Hco86YSJUnoZiE8bhDWlAoU4X48pUEe-')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=password&username=${email}&password=${password}&scope=manage_project:e-commerce-project`
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Incorrect email or password');
  }

  if (responseData.scope) {
    localStorage.setItem('customerId', responseData.scope.split(' ')[1].split(':')[1]);
  }

  localStorage.setItem('accessToken', responseData.access_token);
  localStorage.removeItem('anonymousId');
  localStorage.removeItem('anonymousAccessToken');

  return responseData.access_token;
}

export async function loginUser(data: LoginData) {
  const accessToken = await getCustomerToken(data.email, data.password);
  const loginData = await authenticateUser(data, accessToken);
  return loginData;
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

    localStorage.removeItem('anonymousId');
    localStorage.removeItem('anonymousAccessToken');

    localStorage.setItem('customerId', responseData.customer.id);

    const newAccessToken = await getCustomerToken(data.email, data.password);

    localStorage.setItem('accessToken', newAccessToken);

    const loginData: LoginData = {
      email: data.email,
      password: data.password
    };

    const userLoginData = await authenticateUser(loginData, newAccessToken);
    return userLoginData;
  } catch (error) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return false;
  }
}
