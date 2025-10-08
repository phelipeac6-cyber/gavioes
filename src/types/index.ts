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

export interface Ticket {
  id: number;
  eventName: string;
  eventDate: string;
  location: string;
  price: number;
  image: string;
  available: number;
}