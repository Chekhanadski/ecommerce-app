export interface Address {
  streetName: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddressKey?: string;
  addresses: Address[];
  defaultShippingAddress?: number | null;
  defaultBillingAddress?: number | null;
}