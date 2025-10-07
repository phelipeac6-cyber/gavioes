export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
}