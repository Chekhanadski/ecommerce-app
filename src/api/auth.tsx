import { FormData, LoginData } from '../store/types/auth';

export async function getAccessToken() {
  try {
    const authResponse = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa('dpVH1yIfwBBTMqhnk6jS8bsZ:Hco86YSJUnoZiE8bhDWlAoU4X48pUEe-')}`
      },
      body: `grant_type=client_credentials&scopes=[manage_associate_roles:e-commerce-project, view_api_clients:e-commerce-project, manage_customer_groups:e-commerce-project, manage_connectors:e-commerce-project, manage_sessions:e-commerce-project, manage_subscriptions:e-commerce-project, manage_types:e-commerce-project, manage_categories:e-commerce-project, manage_extensions:e-commerce-project, manage_api_clients:e-commerce-project, manage_shopping_lists:e-commerce-project, manage_standalone_prices:e-commerce-project, manage_project_settings:e-commerce-project, manage_discount_codes:e-commerce-project, manage_connectors_deployments:e-commerce-project, manage_tax_categories:e-commerce-project, manage_states:e-commerce-project, manage_import_containers:e-commerce-project, manage_business_units:e-commerce-project, manage_audit_log:e-commerce-project, manage_stores:e-commerce-project, manage_cart_discounts:e-commerce-project, manage_quote_requests:e-commerce-project, manage_attribute_groups:e-commerce-project, manage_order_edits:e-commerce-project, manage_staged_quotes:e-commerce-project, manage_project:e-commerce-project, manage_quotes:e-commerce-project, manage_checkout_payment_intents:e-commerce-project, manage_customers:e-commerce-project, view_audit_log:e-commerce-project, manage_shipping_methods:e-commerce-project]`
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

  // save customer ID to local storage
  localStorage.setItem('customerId', responseData.scope.split(' ')[1].split(':')[1]);

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

    // save customer ID to local storage
    localStorage.setItem('customerId', responseData.scope.split(' ')[1].split(':')[1]);

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
