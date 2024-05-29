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
}

export interface ImageData {
  url: string;
}
