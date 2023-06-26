import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Animated, Pressable} from "react-native";
import styles from "./routelist.style";
import { findBestRoute } from "../../app/firebase";
import { COLORS } from "../../constants";
import { TouchableHighlight } from "react-native-gesture-handler";
import { googleDirections } from "../../data/googledirections";
import RouteCard from "./RouteCard";


export default function RouteList({origin, destination, o, d}) {
    const br = findBestRoute(o, d);


    const brStops = br == null ? null : br.busRoutes[0];
    const brRoute = br == null ? null : br.route;
    console.log("----------------------------------")
    console.log("BESTROUTE IN ROUTESPAGE: ", br)
    console.log(brRoute);

    // Data preparation for outdoor walking + bus routes walking segments
    console.log("----------------------------------");
    console.log("Origin: ", origin)
    console.log("Destination: ", destination)
    
    const [outdoorDirections, setOutdoorDirections] = useState(null);
    const [outdoorDuration, setOutdoorDuration] = useState(null);
    const [outdoorDistance, setOutdoorDistance] = useState(null);

    useEffect(() => {
        googleDirections(origin, destination).then((x) => {
          const outdoorArr = [x[0].map((z) => [z, "WALKING"]), x[1], x[2] + "m"];
          setOutdoorDirections(outdoorArr[0]);
          setOutdoorDuration(outdoorArr[1]);
          setOutdoorDistance(outdoorArr[2]);
          console.log("outdoorArr: ", outdoorArr);
          console.log("outdoorDirections: ", outdoorDirections);
        });
      }, [origin, destination]);



        
      
    // googleDirections(origin, destination)
    //     .then((x) => {
    //     const outdoorArr = ([x[0].map(z => [z, "WALKING"]), x[1], x[2] + "m"]);
    //     setOutdoorDirections(outdoorArr[0]);
    //     setOutdoorDuration(outdoorArr[1]);
    //     setOutdoorDistance(outdoorArr[2]);
    //     console.log("outdoorArr: ", outdoorArr);
    //     console.log("outdoorDirections: ", outdoorDirections)
        
    // });

        
    const renderItem = ({ item }) => {
        if (item.mode === "Outdoor") {
            console.log("outdoor running")
            return (<RouteCard 
                mode={item.mode} 
                directions={outdoorDirections}
                duration={outdoorDuration}
                distance={outdoorDistance}
                item={item}
                ></RouteCard>);
            }
            return (<RouteCard 
                mode={item.mode} 
                // directions={outdoorDirections}
                // duration={outdoorDuration}
                // distance={outdoorDistance}
                item={item}
                ></RouteCard>);
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
    
        

    
