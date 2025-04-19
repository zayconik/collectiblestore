export type ProductCondition = 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor';

export type ProductCategory = 'Cards' | 'Comics' | 'Figures' | 'Other';

export type CardSubcategory = 
  | 'Slam Attax/WWE Cards' 
  | 'Cricket Attax/Cricket Cards' 
  | 'Hero Attax/Superhero Cards'
  | 'Trump Cards'
  | 'Other Cards';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  subcategory?: CardSubcategory;
  condition: ProductCondition;
  edition?: string;
  rarity?: string;
  year?: string;
  isFeatured: boolean;
  isSold: boolean;
}