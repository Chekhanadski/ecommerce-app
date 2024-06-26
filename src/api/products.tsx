import { getAccessToken } from './auth';

export async function getProducts(page: number = 1, limit: number = 4) {
  const offset = (page - 1) * limit;
  const url = `https://api.europe-west1.gcp.commercetools.com/e-commerce-project/products?limit=${limit}&offset=${offset}`;
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching the products: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching the products');
    }
  }
}

export async function getProductData(id: string) {
  const url = `https://api.europe-west1.gcp.commercetools.com/e-commerce-project/products/${id}`;
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred while fetching the product data: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching the product data');
    }
  }
}
