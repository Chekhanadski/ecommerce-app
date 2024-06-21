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
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');

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
  const accessToken = sessionStorage.getItem('accessToken');
  const customerId = sessionStorage.getItem('customerId');

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
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');

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
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');
  let cart = await (sessionStorage.getItem('customerId') ? getUserCart() : getAnonymousCart());
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
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');
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

export async function clearCart(): Promise<void> {
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');
  const cart = await (accessToken ? getUserCart() : getAnonymousCart());

  if (!cart) {
    throw new Error('No cart found to clear');
  }

  const { id, version, lineItems } = cart;

  const actions = lineItems.map((item) => ({
    action: 'removeLineItem',
    lineItemId: item.id
  }));

  const response = await fetch(`${BASE_URL}/me/carts/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || anonymousAccessToken}`
    },
    body: JSON.stringify({
      version,
      actions
    })
  });

  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }
}

export async function updateLineItemQuantity(lineItemId: string, quantity: number, isAnonymous = false): Promise<Cart> {
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');
  const cart = await (isAnonymous ? getAnonymousCart() : getUserCart());
  let cartId;
  let version;

  if (!cart) {
    throw new Error('No cart found to update item quantity');
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
          action: 'changeLineItemQuantity',
          lineItemId,
          quantity
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update item quantity in cart');
  }

  const data = await response.json();
  return data;
}

export async function applyDiscountCode(code: string): Promise<Cart> {
  const accessToken = sessionStorage.getItem('accessToken');
  const anonymousAccessToken = sessionStorage.getItem('anonymousAccessToken');
  const cart = await (accessToken ? getUserCart() : getAnonymousCart());
  let cartId;
  let version;

  if (!cart) {
    throw new Error('No cart found to apply discount code');
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
          action: 'addDiscountCode',
          code
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to apply discount code');
  }

  const data = await response.json();
  return data;
}
