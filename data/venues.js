const venuesData = require('./venues.json');

const roomCodes = [];
    // Access the JSON data
    for (const roomCode in venuesData) {
      const room = venuesData[roomCode];
      const roomName = room.roomName;
      const floor = room.floor;
      const location = room.location;
      roomCodes.push(roomCode);


      console.log("Room Code:", roomCode);
      console.log("Room Name:", roomName);
      console.log("Floor:", floor);
      console.log("Location:", location);
      console.log("---------------------");
    }

export { roomCodes };
