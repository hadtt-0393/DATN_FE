export interface RoomNumber {
  _id: number;
  number: number;
  unavailableDates: {
    types: Date[];
  };
}

export interface Room {
  _id: number;
  type: string;
  price: number;
  maxPerson: number;
  description: string;
  services: string[];
  roomNumber: string;
  image: string;
}
