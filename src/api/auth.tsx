import { FormData, LoginData } from '../store/types/auth';

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

export async function loginUser(data: LoginData) {
  const response = await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/e-commerce-project/customers/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa('dpVH1yIfwBBTMqhnk6jS8bsZ:Hco86YSJUnoZiE8bhDWlAoU4X48pUEe-')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=password&username=${data.email}&password=${data.password}&scope=manage_customers:e-commerce-project`
    }
  );

  const responseData = await response.json();

  // save access token to local storage
  localStorage.setItem('accessToken', responseData.access_token);

  if (!response.ok) {
    throw new Error('Incorrect email or password');
  }

  const loginData = await authenticateUser(data, responseData.access_token);

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

    if (responseData) {
      const loginData = {
        email: data.email,
        password: data.password
      };
      const userLoginData = await authenticateUser(loginData, accessToken);
      return userLoginData;
    }
    return false;
  } catch (error) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return false;
  }
}
