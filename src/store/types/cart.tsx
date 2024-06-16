export interface ImageData {
  url: string;
}

export interface PriceData {
  value: PriceValue;
  discounted?: {
    value: PriceValue;
  };
}

export interface PriceValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  name: {
    'en-US': string;
  };
  variant: {
    images: ImageData[];
    prices: PriceData[];
  };
  totalPrice: {
    centAmount: number;
  };
}

export interface Cart {
  lineItems: CartItem[];
  totalPrice: {
    centAmount: number;
  };
}
