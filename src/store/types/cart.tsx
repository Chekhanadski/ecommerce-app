export interface ImageData {
  url: string;
}

export interface PriceValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface PriceData {
  value: PriceValue;
  discounted?: {
    value: PriceValue;
  };
}

export interface Variant {
  id: string;
  prices: PriceData[];
  images: ImageData[];
}

export interface LineItem {
  id: string;
  name: {
    'en-US': string;
  };
  quantity: number;
  variant: Variant;
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
}

export interface Cart {
  id: string;
  customerId?: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
}
