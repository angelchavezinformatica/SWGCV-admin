export interface Product {
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
  category: string;
  subcategory: string;
}

export interface Category {
  category: string;
  subcategories: string[];
}

export interface All {
  products: Product[];
  categories: Category[];
}
