const venuesData = require('./venues.json');
const busData = require('./bus-stops.json')

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
      //roomCodes.push({id: roomName, name: roomCode}); // change for autocomplete to add a key id.
    }

const busStops = [];
const busStopCoords = new Map();
    // Access the JSON data
    for (let i = 0; i < busData.length; i++) {
      const busStop = busData[i];
      const busStopName = busStop.name;
      const busStopLocation = {
        latitude: busStop.location[0],
        longitude: busStop.location[1]
      };
      busStopCoords.set(busStopName, busStopLocation);
      busStops.push(busStopName); 
      // busStops.push({id: busStopName, name: busStopName}); // change for autocomplete to add a key id.
    }
    //console.log(busStopCoords)

export { roomCodes, roomCodeCoords, busStops, busStopCoords };
