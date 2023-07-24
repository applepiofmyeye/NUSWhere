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
    setDoc,
    arrayUnion,
    arrayRemove,
    doc,
 } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


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

// Cloud Storage (for photos)
const storage = getStorage(app);

// LOAD FAVOURITE ROUTES INTO FIREBASE
// store as key: value -- uid: [route hrefs]

async function addToFavourites(uid, href) {
    await setDoc(
      doc(db, "favouriteRoutes", uid), 
      { 
        uid: uid,
        routeHref: arrayUnion(href) 
      },
      {merge: true}).then(console.log("Favourite route added to user ", uid))
}

async function removeFromFavourites(uid, href) {
    await setDoc(
      doc(db, "favouriteRoutes", uid), 
      { 
        uid: uid,
        routeHref: arrayRemove(href) 
      },
      {merge: true}).then(console.log("Favourite route removed from user ", uid))
}

async function queryFR(params, uid) {
    const q = query(
      collection(db, 'favouriteRoutes'),
      where('uid', '==', uid),
      where('routeHref', 'array-contains', params)
    );

<<<<<<< HEAD
  const querySnapshot = await getDocs(q);
  

  let queryResult = false;
  querySnapshot.forEach(doc => {
    // console.log(doc.data);
    // console.log("true");
    return true; 
  })
  
  // console.log(queryResult);
  return queryResult
  
}

async function getFavouriteRoutes(uid) {
  // console.log("in firebase::getFavouriteRoutes");
  const q = query(collection(db, "favouriteRoutes"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let hrefParams = [];
  querySnapshot.docs.forEach(doc => {
    hrefParams.push(doc._document.data.value.mapValue.fields.routeHref.arrayValue.values.map(x => x.mapValue.fields));
  })
  return hrefParams
=======
    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (error) {
      console.log(error);
      throw error;
    }
}

async function getFavouriteRoutes(uid) {
    //console.log("in firebase::getFavouriteRoutes");
    const q = query(collection(db, "favouriteRoutes"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let hrefParams = [];
    querySnapshot.docs.forEach(doc => {
      if (doc._document.data.value.mapValue.fields.routeHref.arrayValue.values) {
        hrefParams.push(doc._document.data.value.mapValue.fields.routeHref.arrayValue.values.map(x => x.mapValue.fields));
      }
    })
    return hrefParams
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
}

// GET PHOTOS FROM FIREBASE 
const photosStorage = getStorage(app, "gs://photos-linkways")

// LOAD BUS STOPS INTO FIREBASE -- ONLY NEED TO DO ONCE
const busColRef = collection(db, "busStopNeighbors");

// LOAD BUSSTOPS
const busStopJson = require('../data/bus-stops.json');

// LOAD VENUES
const venuesJson = require("../data/venues.json")

// LOAD BUILDINGS INTO FIREBASE
const buildingsJson = require('../data/buildings.json')

const loadBusStopData = async () => {
    try {
        const neighborSet = {};
        const routesSet = {};
      for (let i = 0; i < busStopJson.length; i++) {
        const busStop = busStopJson[i];
        const busStopName = busStop.name;
        const location = busStop.location;
        const routes = busStop.routes;
        const neighbors = busStop.neighbors;
        const neighborArr = [];

        for (const neighbor in neighbors) {
          neighborArr.push(neighbor.value);
        }

        neighborSet[busStopName] = [];

        routesSet[busStopName] = 
        await addDoc(busColRef, {
          stopId: busStopName,
          coords: location,
          routes: routes,
          neighbors: neighbors
        });

<<<<<<< HEAD
  
        
  
        // console.log("DONE LOADING BUS STOPS");
=======
        console.log("DONE LOADING BUS STOPS");
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
      }
     
    } catch (error) {
      console.error("Error loading bus stop data:", error);
    }
};

const neighborBusSet = {}
const routesBusSet = {}

// LOAD BUS STOPS FROM JSON -- temp solution
for (let i = 0; i < busStopJson.length; i++) {
  const name = busStopJson[i]["name"];
  const neighbors = busStopJson[i]["neighbors"]
  
  neighborBusSet[name] = Object.values(neighbors);
  
  routesBusSet[name] = {};
  Object.entries(neighbors).forEach(([key, value]) => {
    if (!routesBusSet[name][value]) {
      routesBusSet[name][value] = [];
    }
    routesBusSet[name][value].push(key);
  });
}

// Find shortest bus route
function findBestBusRoute(start, destination) {
<<<<<<< HEAD
  //console.log("In findBestBusRoute")
=======
  const queue = []; // Stores bus stops to visit.
  const visited = new Set(); // Stores bus stops already visited.
  const parent = {}; // Stores bus stop that is previously visited before visiting the current bus stop.
  const parentRoute = {}; // Stores relevant bus stop information of the parent.

>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
  if (start === destination) {
    return null;
  }

  // Variables to check if start and destination provided is a venue/building name.
  let startBusStop = null;
  let startIsBusStop = true;
  let endBusStop = null;
  let endIsBusStop = true;

  for (const key of Object.keys(buildingsJson)) {   
    if (buildingsJson[key].name === start) {
      startBusStop = buildingsJson[key].busStop;
      startIsBusStop = false;
      break;
    }
  }

  for (const key of Object.keys(buildingsJson)) {
    if (buildingsJson[key].name === destination) {
      endBusStop = buildingsJson[key].busStop;
      endIsBusStop = false;
      break;
    }
  }

  for (const key of Object.keys(venuesJson)) {
    if (key === start) {
      startBusStop = venuesJson[key].busStop; 
      startIsBusStop = false;
      break;
    } 
  }

  for (const key of Object.keys(venuesJson)) {
    if (key === destination) {
      endBusStop = venuesJson[key].busStop;
      endIsBusStop = false;
      break;
    }
  }

  if (startBusStop == endBusStop) {
    return null;
  }

  queue.push(startBusStop);
  visited.add(startBusStop);
  
  // BFS algorithm
  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (startIsBusStop && endIsBusStop) {
      if (currentNode === destination) {
        return constructRoute(parent, parentRoute, start, destination, destination);
      }
    } else if (startIsBusStop && !endIsBusStop) {
      if (currentNode === endBusStop) {
        return constructRoute(parent, parentRoute, start, endBusStop, destination);
      }
    } else if (!startIsBusStop && !endIsBusStop) {
      if (currentNode === endBusStop) {
        return constructRoute(parent, parentRoute, startBusStop, endBusStop, destination);
      }
    }

    const currentNeighbors = neighborBusSet[currentNode];
<<<<<<< HEAD
    //console.log("------------------------------------")
    //console.log("currentNode: ", JSON.stringify(currentNode));
    //console.log("currentNeighbors: ", currentNeighbors);
    //console.log("------------------------------------")
    if (currentNeighbors == undefined) {
      // console.log("No valid route found.")
      return null;
    }

    for (const n of currentNeighbors) {
      if (!visited.has(n)) {
        // console.log("")
=======

    for (const n of currentNeighbors) {
      if (!visited.has(n)) {
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
        queue.push(n);
        visited.add(n);
        parent[n] = currentNode;
        parentRoute[currentNode] = routesBusSet[currentNode]; 
      }
    }
  }
  // No valid route found
  return null;
}

<<<<<<< HEAD
function constructRoute(parent, parentRoute, start, destination) {
  //console.log('Constructing Route')
=======
function constructRoute(parent, parentRoute, startBusStop, endBusStop, destination) {
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
  const route = [];

  let current = endBusStop;

  // Retracing bus route
  while (current !== startBusStop) {
    route.unshift(current);
    current = parent[current];
  }

  route.unshift(startBusStop);

  const newRoute = []; // What will be displayed in the routes page, elements are direction step.
  const busRoutes = []; // Stores the buses to take from one stop to another.
  const buses = []; // Store all buses that users may need to take.
  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];
    console.log(i + ' ' + from);
    console.log(i + ' ' + to);
    newRoute[i + 1] = route[i + 1] + ". To reach, take bus:" + parentRoute[from][to].map(x => " " + x);
    busRoutes.push(parentRoute[from][to]);
  }
  newRoute[0] = "Walk to Bus Stop: " + route[0];
  newRoute.push("Walk to " + destination);

  function inArray(element, array) {
    let bool = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        bool = true;
      }
    }
    return bool;
  }

  for (let i = 0; i < busRoutes.length; i++) {
    const curr = busRoutes[i];
    for (let j = 0; j < curr.length; j++) {
      if (!inArray(curr[j], buses)) {
        buses.push(curr[j]);
      }
    }
  }

<<<<<<< HEAD
  //console.log("Route: " + route);
  //console.log("BusRoutes: " + busRoutes);
=======
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
  return {
    route: newRoute,
    busRoutes: buses,
  };
}

const buildingColRef = collection(db, "buildingNeighbors")

//LOAD VENUES INTO FIREBASE -- ONLY DO THIS ONCE
const loadBuildingData = async () => {
  try {
    console.log("in loadBuildingData")
      // const neighborBuildingSet = {};
      // const routesBuildingSet = {};
      for (const key of Object.keys(buildingsJson)) {
      const building = buildingsJson[key];
      const buildingName = building.name;
      const location = building.location;
      const neighbours = building.neighbours;

      // neighborBuildingSet[buildingName] = [];

      // routesBuildingSet[buildingName] = 
      console.log("DONE LOADING BUILDINGS");
      await addDoc(buildingColRef, {
        name: buildingName,
        coords: location,
        neighbors: neighbours
      });
    }
  } catch (error) {
    console.error("Error loading building name data:", error);
  }
};

// //LOAD BUILDINGS FROM JSON -- temp solution
const neighborBuildingSet = {};

for (const key of Object.keys(buildingsJson)) {
  const name = buildingsJson[key].name;  
  neighborBuildingSet[name] = buildingsJson[key].neighbours;
}

<<<<<<< HEAD
/*
neighborBuildingSet ? console.log("neighborBuildingSet loaded") 
                    : console.log("neighborBuildingSet not loaded")
*/



// FIND SHORTEST PATH -- SHELTERED
function findBestShelteredRoute(start, destination) {
  //console.log("START: ", start);
  //console.log("destination: ", destination);
  //console.log("in findBestshelteredRoute")
=======
neighborBuildingSet ? console.log("neighborBuildingSet loaded") 
                    : console.log("neighborBuildingSet not loaded")

// FIND SHORTEST PATH -- SHELTERED
function findBestShelteredRoute(start, destination) {
  console.log("in findBestshelteredRoute")
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
  let startBuilding = null;
  let endBuilding = null;
  for (const buildingKey in buildingsJson) {   
    if (buildingKey === start) {
      startBuilding = buildingKey;
      break;
    }
  }

  for (const buildingKey in buildingsJson) {
    if (buildingKey === destination) {
      endBuilding = buildingKey;
      break;
    }
  }

  for (const venue in venuesJson) {
    if (venue === start) {
      startBuilding = venuesJson[venue].building; 
      break;
    } 
  }

  for (const venue in venuesJson) {
    if (venue === destination) {
      endBuilding = venuesJson[venue].building
      break;
    }
  }

  if (!startBuilding && !endBuilding) {
<<<<<<< HEAD
    //console.log("invalid input for sheltered route algo");
    return 0}

=======
    console.log("invalid input for sheltered route algo");
    return 0
  }
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef

  //console.log("In findBestShelteredRoute")
  const visited = new Set();

  for (const building in buildingsJson){
    if (!visited[building]){
      const queue = [];
      const parent = {};
    
      queue.push(startBuilding);
      visited.add(startBuilding);
    
      while (queue) {
        const currentNode = queue.shift();

        if (currentNode === endBuilding) {
          // endBuilding reached, construct and return the route
          return constructShelteredRoute(parent, startBuilding, endBuilding);
        }
    
        const currentNeighbors = neighborBuildingSet[currentNode];

        if (!currentNeighbors || currentNeighbors.length == 0) {
          //console.log("No valid route found.")
          return 1;
        }
    
        for (const n of currentNeighbors) {
          if (!visited.has(n)) {
            queue.push(n);
            visited.add(n);
            parent[n] = currentNode;
            
          }
        }
      }
    }
  }
  // No valid route found
  return 1;
}


function constructShelteredRoute(parent, startBuilding, endBuilding) {
  const route = [];
  let current = endBuilding;

  while (current !== startBuilding) {
    route.unshift(current);
    current = parent[current];
  }

  route.unshift(startBuilding);
<<<<<<< HEAD
  //console.log("Construct Sheltered Route:" + route);

=======
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef

  return route
}

export { 
  auth, 
  findBestBusRoute , 
  findBestShelteredRoute, 
  addToFavourites, 
  removeFromFavourites, 
  queryFR, 
  getFavouriteRoutes, 
  photosStorage
};