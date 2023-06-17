// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Required for side-effects
import "firebase/firestore";
import { 
    getFirestore, 
    collection, 
    getDocs,
    addDoc,
    query,
    where,

 } from "firebase/firestore";
 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCi0nWW_ksUwL8I2VwSIty2GGi3BGcrKtw",
    authDomain: "nuswhere-e219d.firebaseapp.com",
    projectId: "nuswhere-e219d",
    storageBucket: "nuswhere-e219d.appspot.com",
    messagingSenderId: "827689257762",
    appId: "1:827689257762:web:4649238c67db99c7b8f37b"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

// Firestore data collection and adding data
const db = getFirestore();
const colRef = collection(db, "busStopNeighbors")
//const q = query(colRef, where("stopId", "===",)) // TODO

// getDocs(colRef)
//     .then((snapshot) => {
//         let neighbors
//     })


// for ()
  
//   const neighborSet = {};
//   const routesSet = {};
  
//   const { name, neighbors } = jsonData;
  
//   neighborSet[name] = Object.values(neighbors);
  
//   routesSet[name] = {};
//   Object.entries(neighbors).forEach(([key, value]) => {
//     if (!routesSet[name][value]) {
//       routesSet[name][value] = [];
//     }
//     routesSet[name][value].push(key);
//   });
  
//   console.log(neighborSet);
//   console.log(routesSet);
  


// Bus stops 
const busStopJson = require('../data/bus-stops.json');

const loadBusStopData = async () => {
    try {
        const neighborSet = {};
        const routesSet = {};
      for (let i = 0; i < busStopJson.length; i++) {
        const busStop = busStopJson[i];
        const name = busStop.name;
        const location = busStop.location;
        const routes = busStop.routes;
        const neighbors = busStop.neighbors;
        const neighborArr = [];

        for (const neighbor in neighbors) {
            neighborArr.push(neighbor.value);
        }

        neighborSet[name] = [];

        routesSet[name] = 

  
        
  
        console.log("DONE LOADING BUS STOPS");
      }
      await addDoc(colRef, {
        stopId: name,
        coords: location,
        routes: routes,
        neighbors: neighbors
    });
    } catch (error) {
      console.error("Error loading bus stop data:", error);
    }
  };

  

  function findBestRoute(start, destination, neighbors, routes) {
    const queue = [];
    const visited = new Set();
    const parent = {};
    const parentRoute = {};
  
    queue.push(start);
    visited.add(start);
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
  
      if (currentNode === destination) {
        // Destination reached, construct and return the route
        return constructRoute(parent, parentRoute, start, destination);
      }
  
      const currentNeighbors = neighbors[currentNode];
  
      for (const neighbor of currentNeighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
          parent[neighbor] = currentNode;
          parentRoute[neighbor] = routes[currentNode][neighbor];
        }
      }
    }
  
    // No valid route found
    return null;
  }
  
  function constructRoute(parent, parentRoute, start, destination) {
    const route = [];
    let current = destination;
  
    while (current !== start) {
      route.unshift(current);
      current = parent[current];
    }
  
    route.unshift(start);
  
    const busRoutes = [];
    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i];
      const to = route[i + 1];
      busRoutes.push(parentRoute[to][from]);
    }
  
    return {
      route: route,
      busRoutes: busRoutes,
    };
  }
  
  // Example usage:
  const start = 'AS5';
  const destination = 'COM2';
  const neighbors = {
    A1: ['COM2'],
    D1: ['BIZ 2'],
    BTC: ['BIZ 2'],
    COM2: ['A1', 'D1', 'BTC'],
    BIZ2: ['D1', 'BTC'],
  };
  const routes = {
    A1: {
      COM2: 'Bus 1',
    },
    COM2: {
      A1: 'Bus 1',
      D1: 'Bus 2',
      BTC: 'Bus 3',
    },
    D1: {
      'BIZ 2': 'Bus 2',
    },
    BTC: {
      'BIZ 2': 'Bus 3',
    },
  };
  
  //const bestRoute = findBestRoute(start, destination, neighbors, routes);
  //console.log(bestRoute.route);      // Output: ['A1', 'COM2']
  //console.log(bestRoute.busRoutes);  // Output: ['Bus 1']
  

export { auth, db };