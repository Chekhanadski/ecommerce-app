import { getAccessToken } from './auth';

export async function getCustomerData() {
  const customerId = sessionStorage.getItem('customerId');

  const url = `https://api.europe-west1.gcp.commercetools.com/e-commerce-project/customers/${customerId}`;
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching the customer data: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching the customer data');
    }
  }
}

export async function updateCustomerData(customerData: string) {
  // get customer ID from local storage
  const customerId = sessionStorage.getItem('customerId');

  const url = `https://api.europe-west1.gcp.commercetools.com/e-commerce-project/customers/${customerId}`;
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: customerData
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching the customer data: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching the customer data');
    }
  }
}
