const venuesData = require('./venues.json');

const roomCodes = [];
const roomCodeCoords = new Map();
    // Access the JSON data
    for (const roomCode in venuesData) {
      const room = venuesData[roomCode];
      const roomName = room.roomName;
      const floor = room.floor;
      const location = room.location;
      roomCodeCoords.set(roomCode, [roomName, floor, location]);
      roomCodes.push(roomCode);
    }

export { roomCodes, roomCodeCoords };
