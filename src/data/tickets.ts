import { Ticket } from "@/types";

export const tickets: Ticket[] = [
  {
    id: 1,
    eventName: "Corinthians vs Palmeiras",
    eventDate: "15 de Setembro, 2024",
    location: "Neo Química Arena",
    price: 120.00,
    image: "https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: 50,
  },
  {
    id: 2,
    eventName: "Corinthians vs São Paulo",
    eventDate: "29 de Setembro, 2024",
    location: "Neo Química Arena",
    price: 110.00,
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: 100,
  },
  {
    id: 3,
    eventName: "Final do Paulistão",
    eventDate: "10 de Outubro, 2024",
    location: "Neo Química Arena",
    price: 250.00,
    image: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=800",
    available: 20,
  },
];