const venuesData = require('./venues.json');
const busData = require('./bus-stops.json');
const buildingData = require('./buildings.json');

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

    roomCodes ? console.log("roomCodes loaded") : console.log("roomCodes not loaded");
    roomCodeCoords ? console.log("roomCodeCoords loaded") : console.log("roomCodeCoords not loaded");

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
    }
    busStopCoords ? console.log("busStopCoords loaded") : console.log("busStopCoords not loaded");
    busStops ? console.log("busStops loaded") : console.log("busStops not loaded");

const buildings = [];
const buildingCoords = new Map();
    // Access the JSON data
    for (const buildingKey in buildingData) {
      const buildingObj = buildingData[buildingKey];
      const buildingName = buildingObj.name;
      const buildingLocation = buildingObj.location;
      buildingCoords.set(buildingName, buildingLocation);
      buildings.push(buildingName);
    }
    buildingCoords ? console.log("buildingCoords loaded") : console.log("buildingCoords not loaded");
    buildings ? console.log("buildings loaded") : console.log("buildings not loaded");
    console.log(buildings)

export { roomCodes, roomCodeCoords, busStops, busStopCoords, buildings, buildingCoords};
