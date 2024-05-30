export interface ProductData {
  id: string;
  masterData: MasterData;
}

export interface MasterData {
  current: CurrentData;
}

export interface CurrentData {
  name: NameLang;
  description: NameLang;
  masterVariant: MasterVariant;
}

export interface NameLang {
  'en-US': string;
  'en-GB': string;
  'de-DE': string;
}

export interface MasterVariant {
  images: ImageData[];
  prices: PriceData[];
}

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
