export interface Hotel {
  _id: number;
  hotelName: string;
  city: string;
  address: string;
  distance: number;
  photos: string[];
  title: string;
  description: string;
  ratingAvg: number;
  roomIds: string[];
  cheapestPrice: number;
  highestPrice: number;
  featured: boolean;
  services: string[];
  comments: Comment[];
  discount: number;
  email: string;
  hotline: string;
  images: string[];
  forms: any[];
  cleanlinessAvg: number;
  facilitiesAvg: number;
  countComments: number;
  serviceAvg: number;
  comfortableAvg: number;
  countForms: number
}


export interface Comment {
  content: string;
  created: string;
  rating: number;
  username: string;
  image: string;
  cleanliness: number;
  comfort: number;
  staff: number;
  facilities: number;
}