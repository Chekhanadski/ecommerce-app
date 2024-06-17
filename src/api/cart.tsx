const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/e-commerce-project';

interface Cart {
  id: string;
  customerId?: string;
  version: number;
  lineItems: any[];
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
}

export async function getAnonymousCart(): Promise<Cart | null> {
  const anonymousAccessToken = localStorage.getItem('anonymousAccessToken');

  const response = await fetch(`${BASE_URL}/me/carts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${anonymousAccessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get anonymous cart');
  }

  const data = await response.json();

  return data.results.length > 0 ? data.results[0] : null;
}

export async function getUserCart(): Promise<Cart | null> {
  const accessToken = localStorage.getItem('accessToken');
  const customerId = localStorage.getItem('customerId');

  const response = await fetch(`${BASE_URL}/me/carts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get user cart');
  }

  const data = await response.json();

  return data.results.find((cart: Cart) => cart.customerId === customerId) || null;
}

export async function createCart(): Promise<Cart> {
  const accessToken = localStorage.getItem('accessToken');
  const anonymousAccessToken = localStorage.getItem('anonymousAccessToken');

  const response = await fetch(`${BASE_URL}/me/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || anonymousAccessToken}`
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

export async function addToCart(productId: string): Promise<Cart> {
  const accessToken = localStorage.getItem('accessToken');
  const anonymousAccessToken = localStorage.getItem('anonymousAccessToken');
  let cart = await (localStorage.getItem('customerId') ? getUserCart() : getAnonymousCart());
  let cartId;
  let version;

  if (!cart) {
    cart = await createCart();
    cartId = cart.id;
  } else {
    cartId = cart.id;
    version = cart.version;
  }

  const response = await fetch(`${BASE_URL}/me/carts/${cartId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || anonymousAccessToken}`
    },
    body: JSON.stringify({
      version: version || 1,
      actions: [
        {
          action: 'addLineItem',
          productId,
          quantity: 1
        }
      ],
      currency: 'EUR'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }

  const data = await response.json();
  return data;
}

export async function removeLineItem(lineItemId: string, isAnonymous = false): Promise<Cart> {
  const accessToken = localStorage.getItem('accessToken');
  const anonymousAccessToken = localStorage.getItem('anonymousAccessToken');
  const cart = await (isAnonymous ? getAnonymousCart() : getUserCart());
  let cartId;
  let version;

  if (!cart) {
    throw new Error('No cart found to remove item from');
  } else {
    cartId = cart.id;
    version = cart.version;
  }

  const response = await fetch(`${BASE_URL}/me/carts/${cartId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || anonymousAccessToken}`
    },
    body: JSON.stringify({
      version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  const data = await response.json();
  return data;
}
