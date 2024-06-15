const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/e-commerce-project';

async function getCart() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BASE_URL}/me/carts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get cart');
  }

  const data = await response.json();
  return data.results[0];
}

export default async function createCart() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BASE_URL}/me/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      currency: 'EUR'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create cart');
  }

  const data = await response.json();
  return data;
}

export async function addToCart(productId: string) {
  let cart;

  try {
    cart = await getCart();
  } catch {
    cart = await createCart();
  }

  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BASE_URL}/me/carts/${cart.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      actions: [
        {
          action: 'addLineItem',
          productId,
          quantity: 1
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }

  const data = await response.json();
  return data;
}
