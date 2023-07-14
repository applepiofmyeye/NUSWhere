import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Animated, Pressable} from "react-native";
import styles from "./routelist.style";
import { findBestBusRoute, findBestShelteredRoute } from "../../app/firebase";
import { COLORS } from "../../constants";
import { TouchableHighlight } from "react-native-gesture-handler";
import { googleDirections } from "../../data/googledirections";
import RouteCard from "./RouteCard";


export default function RouteList({origin, destination, o, d, handler}) {
    // hardcoded values for one bus stop to another duration
    const busOneStepDuration = 2 * 60 
    const shelteredOneStepDuration = 3 * 60

    // const br = findBestBusRoute(o, d);


    // const brStops = br == null ? null : br.busRoutes[0];
    // const brRoute = br == null ? null : br.route;
    // console.log("----------------------------------")
    // console.log("BESTROUTE IN ROUTESLIST: ", br)
    // console.log(brRoute);

    // // Data preparation for outdoor walking + bus routes walking segments
    // console.log("----------------------------------");
    // console.log("Origin: ", origin)
    // console.log("Destination: ", destination)

    const [busDirections, setBusDirections] = useState(null);
    const [busDuration, setBusDuration] = useState(null);
    const [busRoute, setBusRoute] = useState(null)

    
    const [outdoorDirections, setOutdoorDirections] = useState(null);
    const [outdoorDuration, setOutdoorDuration] = useState(null);
    const [outdoorDistance, setOutdoorDistance] = useState(null);
    const [outdoorAll, setOutdoorAll] = useState(null);

    const [shelteredDirections, setShelteredDirections] = useState(null);
    const [shelteredDuration, setShelteredDuration] = useState(null);

    const [initialised, setInitialised] = useState(false)


    useEffect(() => {

            googleDirections(origin, destination).then((x) => {
                if (x){
                    const outdoorArr = [x[0], x[1], x[2] + "m"];

                    setOutdoorDirections(outdoorArr[0]);
                    setOutdoorDuration(outdoorArr[1]);
                    setOutdoorDistance(outdoorArr[2]);
                    setOutdoorAll(outdoorArr[3])

                    console.log("outdoorArr: ", outdoorArr);
                    console.log("outdoorDirections: ", outdoorDirections);
                }
                
                
              });
      
              const busShortestPath = findBestBusRoute(o, d);
              console.log(busShortestPath)
              if (
                busShortestPath != null && 
                busShortestPath != 1 && 
                busShortestPath != 0) {
                  setBusDirections(busShortestPath.route);
                  setBusRoute(busShortestPath.busRoutes[0]);
                  busShortestPath.busRoutes != null ? setBusDuration(busShortestPath.busRoutes.length * busOneStepDuration) : null
              }
              
              
      
              const shelteredShortestPath = findBestShelteredRoute(o, d) 
              // currently only works for going from venue to venue not bus to bus
              if (
                shelteredShortestPath != null && 
                shelteredShortestPath != 1 && 
                shelteredShortestPath != 0) {
                  // 1 is for cant find route, 0 is for invalid input
                  setShelteredDirections(shelteredShortestPath);
                  shelteredDirections != null ? setShelteredDuration(shelteredDirections.length * shelteredOneStepDuration) : null
              // hardcoded duration for placeholder -- each step from one building to another assumed to be 3
              }

    }, [origin, destination]);
    



        
      
        
    const renderItem = ({ item }) => {
        if (item.mode === "Outdoor") {
            console.log("outdoor card running")
            return (<RouteCard 
                mode={item.mode} 
                directions={outdoorDirections} // array of string instructions
                duration={outdoorDuration}
                distance={outdoorDistance}
                all={outdoorAll}
                handler={handler}
                ></RouteCard>);
        } else if (item.mode === "Sheltered") {
            console.log("sheltered card running")
            return(<RouteCard 
                mode={item.mode} 
                directions={shelteredDirections} // array of buildings to walk through 
                duration={shelteredDuration} 
                distance={null}
                handler={handler}
                all={null}
                ></RouteCard>);
        } else{
            return (<RouteCard 
                mode={item.mode} 
                directions={busDirections} // array of bus stops
                route={busRoute} // possible bus routes to take
                duration={busDuration}
                distance={null}
                handler={handler}
                all={null}
                ></RouteCard>);

        }
        
            
    }
    

        
    

    

    const data = [ {id: 1, mode: "Outdoor"},
                       {id: 2, mode: "Sheltered"},
                       {id: 3, mode: "Bus"}
                     ]
    return (    
        <View style={{flex: 2, backgroundColor: COLORS.background}}>
            {outdoorDirections && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={{padding: 10}}
            />}
            
        </View>
        
    )
    
}
    
        

    
