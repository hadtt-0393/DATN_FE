export interface Form {
  _id?: number;
  adults: number;
  children: number;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
  address: string;
  Rooms: RoomName[];
  cost: number;
  name: string;
  email: string;
  hotel: any
  country: string;
  phoneNumber: string;
  price: number;
  hotelId: string;
  roomIds: string;
  comment?: Comment;
  rating?: number;
  status: boolean;
}

interface Comment {
  service: number,
  cleanliness: number,
  comfortable: number,
  facilities: number,
  content: string,
  image: string
}

interface RoomName {
  roomName: string;
  quantity: number;
}
