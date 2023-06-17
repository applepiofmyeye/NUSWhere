import "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../app/firebase";
const busStopJson = require('./bus-stops.json');

const loadBusStopData = async () => {
  try {
    for (let i = 0; i < busStopJson.length; i++) {
      const busStop = busStopJson[i];
      const name = busStop.name;
      const location = busStop.location;
      const routes = busStop.routes;
      const neighbors = busStop.neighbors;

      await setDoc(doc(db, "BusStops", name), {
        stopId: name,
        coords: location,
        routes: routes,
        neighbors: neighbors
      });

      console.log("DONE LOADING BUS STOPS");
    }
  } catch (error) {
    console.error("Error loading bus stop data:", error);
  }
};

