export interface Hotel {
  _id: number;
  hotelName: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  title: string;
  description: string;
  ratingAvg: number;
  rooms: string[];
  cheapestPrice: number;
  featured: boolean;
  services: string[];
  comments: Comment[];
  discount: number;
}


export interface Comment {
  content: string;
  created: string;
  rating: number;
  username: string;
  image: string;
  cleanliness:number;
  comfort:number;
  staff: number;
  facilities: number;
}