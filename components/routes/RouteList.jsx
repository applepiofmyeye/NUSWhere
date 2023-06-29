import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, Animated, Pressable} from "react-native";
import styles from "./routelist.style";
import { findBestRoute } from "../../app/firebase";
import { COLORS } from "../../constants";
import { TouchableHighlight } from "react-native-gesture-handler";
import { googleDirections } from "../../data/googledirections";
import RouteCard from "./RouteCard";


export default function RouteList({origin, destination, o, d}) {
    const [buttonPressed, setButtonPressed] = useState(false);
    const br = findBestRoute(o, d);


    const brStops = br == null ? null : br.busRoutes[0];
    const brRoute = br == null ? null : br.route;
    console.log("----------------------------------")
    console.log("BESTROUTE IN ROUTESPAGE: ", br)
    console.log(o, d)
    console.log(brRoute);

    // Data preparation for outdoor walking + bus routes walking segments
    console.log("----------------------------------");
    console.log("Origin: ", origin)
    console.log("Destination: ", destination)
    
    let outdoorDirections;
    let outdoorDuration;
    let outdoorDistance;


        
      
    googleDirections(origin, destination)
        .then((x) => {
        const outdoorArr = ([x[0].map(z => [z, "WALKING"]), x[1], x[2] + "m"]);
        outdoorDirections = outdoorArr[0];
        outdoorDuration = outdoorArr[1];
        outdoorDistance = outdoorArr[2];
        console.log(outdoorArr);
    });
        
        
        

        
    

    

    const data = [ {id: 1, mode: "Outdoor"},
                       {id: 2, mode: "Sheltered"},
                       {id: 3, mode: "Bus"}
                     ]

    const renderItem = ({ item }) => {
        if (item.mode === "Outdoor") {
            console.log("outdoor running")
            console.log(outdoorDirections);
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
        
        


        // } else if (idem.mode === "Sheltered") {
        //     return 
        // }


    return (    
        <View style={{flex: 2, backgroundColor: COLORS.background}}>
            {/* <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Favourite Routes
                </Text>
            </View> */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                style={{padding: 10}}
                

            />
        </View>
        
    )
    
}
    
        

    
