import { ImageSourcePropType } from 'react-native';

export type StorageType = 'fridge' | 'freezer' | 'dry';

export interface STORAGEFILTER {
  label: string;
  value: StorageType | 'all';
}

export interface PANTRYITEM {
  id: string;
  name: string;
  quantity: string;
  image_url: ImageSourcePropType;
  expiration_date: string;
  storage: StorageType;
  created_at: string;
  category: string;
}
