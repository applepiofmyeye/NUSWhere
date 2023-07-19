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
    updateDoc,
    doc,
    FieldValue,

 } from "firebase/firestore";
 import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
 


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
    {merge: true} ).then(console.log("Favourite route added to user ", uid))
    

}

async function removeFromFavourites(uid, href) {

  await setDoc(
    doc(db, "favouriteRoutes", uid), 
    { 
      uid: uid,
      routeHref: arrayRemove(href) 
    },
    {merge: true} ).then(console.log("Favourite route removed from user ", uid))
    

}

async function queryFR(params, uid) {
  const q = query(
    collection(db, 'favouriteRoutes'),
    where('uid', '==', uid),
    where('routeHref', 'array-contains', params)
  );

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getFavouriteRoutes(uid) {
  console.log("in firebase::getFavouriteRoutes");
  const q = query(collection(db, "favouriteRoutes"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let hrefParams = [];
  querySnapshot.docs.forEach(doc => {
    if (doc._document.data.value.mapValue.fields.routeHref.arrayValue.values) {
      hrefParams.push(doc._document.data.value.mapValue.fields.routeHref.arrayValue.values.map(x => x.mapValue.fields));
    }
  })
  return hrefParams
}


// GET PHOTOS FROM FIREBASE 
const photosStorage = getStorage(app, "gs://photos-linkways")



// LOAD BUS STOPS INTO FIREBASE -- ONLY NEED TO DO ONCE
const busColRef = collection(db, "busStopNeighbors");

const busStopJson = require('../data/bus-stops.json');

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

  
        
  
        console.log("DONE LOADING BUS STOPS");
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



// FIND SHORTEST BUS ROUTES 
function findBestBusRoute(start, destination) {
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

    const currentNeighbors = neighborBusSet[currentNode];
    if (currentNeighbors == undefined) {
      console.log("No valid route found.")
      return null;
    }

    for (const n of currentNeighbors) {
      if (!visited.has(n)) {
        console.log("")
        queue.push(n);
        visited.add(n);
        parent[n] = currentNode;
        parentRoute[n] = routesBusSet[currentNode] || {};
        parentRoute[n][currentNode] = routesBusSet[currentNode][n];
      }
    }
  }

  // No valid route found
  return null;
}

function constructRoute(parent, parentRoute, start, destination) {
  console.log('Constructing Route')
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

  console.log("Route: " + route);
  console.log("BusRoutes: " + busRoutes);
  return {
    route: route,
    busRoutes: busRoutes,
  };
}


//LOAD VENUES
const venuesJson = require("../data/venues.json")


// LOAD BUILDINGS INTO FIREBASE
const buildingsJson = require('../data/buildings.json')



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


neighborBuildingSet ? console.log("neighborBuildingSet loaded") 
                    : console.log("neighborBuildingSet not loaded")




// FIND SHORTEST PATH -- SHELTERED
function findBestShelteredRoute(start, destination) {
  console.log("in findBestshelteredRoute")
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
    console.log("invalid input for sheltered route algo");
    return 0}


  console.log("In findBestShelteredRoute")
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
          console.log("No valid route found.")
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