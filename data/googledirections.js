import { GOOGLE_API } from '../keys';
import axios from 'axios';



export function googleDirections(origin, destination, handle) {
    console.log("----------------------------")
    console.log("RECEIVED DATA: ", origin, destination)
    const data = {
        origin: {
          location: {
            latLng: {
                latitude: origin.latitude,
                longitude:  origin.longitude
            }
          }
        },
        destination: {
          location: {
            latLng: {
                latitude: destination.latitude,
                longitude: destination.longitude
            }
          }
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        departureTime: '2023-10-15T15:01:23.045123456Z',
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false
        },
        languageCode: 'en-US',
        units: 'IMPERIAL'
      };
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_API,
    //   'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      'X-Goog-FieldMask': 'routes'
    };
    const instructions = (response) => response.routes[0].legs[0].steps.map((step) => step.navigationInstruction.instructions)
    const duration = (response) => response.routes[0].staticDuration
    const distance = (response) => response.routes[0].distanceMeters

    var arr;
    axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', data, { headers })
        .then(function (response) {
            arr = [instructions(response.data), duration(response.data), distance(response.data)]
            console.log(arr);
        })
        .catch(function (error) {
            console.log(error);
        });
    handle(arr);


}

