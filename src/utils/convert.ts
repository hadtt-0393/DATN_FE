const convertNumber = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB');
}

const convertTime = (date: string) => {
    return new Date(date).toLocaleString('en-GB');
}

interface RoomChooseName {
    roomName: string;
    quantity: number;
}

const convertRoomToString = (rooms: RoomChooseName[]) => {
    return rooms.map(room => (`${room.quantity} x ${room.roomName}`)).join('')
}

export { convertNumber, convertDate, convertRoomToString, convertTime }