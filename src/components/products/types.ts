
export interface PackageItem {
  id?: number;
  name: string;
  price: number;
  price_unit: string;
  limit_devices: number;
  time_of_use: number;
  is_active: boolean;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  version: string;
  packages?: number;
  licenses?: number;
  isActive: boolean;
  created: string;
  update_url: string;
  download_url: string;
  encrypt_public_key?: string;
  encrypt_private_key?: string;
  status: string;
  post?: {
    title: string;
    description: string;
    html: string;
    keywords: string;
    show_full_page: boolean;
  };
}
