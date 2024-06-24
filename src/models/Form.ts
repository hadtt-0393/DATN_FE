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
  whoBookingFor: number; 
  specialRequest: string;
  country: string;
  phoneNumber: string;
  price: number;
  hotelId: string;
  roomIds: string;
  isComment: boolean;
}

interface RoomName {
  roomName: string;
  quantity: number;
}
