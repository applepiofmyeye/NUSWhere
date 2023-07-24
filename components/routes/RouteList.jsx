import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { findBestBusRoute, findBestShelteredRoute } from "../../app/firebase";
import { COLORS } from "../../constants";
import { googleDirections } from "../../data/googledirections";
import RouteCard from "./RouteCard";
import CustomButton from "../account/CustomButton/CustomButton";

export default function RouteList({origin, destination, o, d, handler, handleBack}) {
    // hardcoded values for one bus stop to another duration
    const busOneStepDuration = 2 * 60 
    const shelteredOneStepDuration = 60

    const [busDirections, setBusDirections] = useState(null);
    const [busDuration, setBusDuration] = useState(null);
    const [busRoute, setBusRoute] = useState(null)

    const [outdoorDirections, setOutdoorDirections] = useState(null);
    const [outdoorDuration, setOutdoorDuration] = useState(null);
    const [outdoorDistance, setOutdoorDistance] = useState(null);
    const [outdoorAll, setOutdoorAll] = useState(null);

    const [shelteredDirections, setShelteredDirections] = useState(null);
    const [shelteredDuration, setShelteredDuration] = useState(null);

    useEffect(() => {

            googleDirections(origin, destination).then((x) => {
                if (x){
                    const outdoorArr = [x[0], x[1], x[2] + "m"];
                    setOutdoorDirections(outdoorArr[0]);
                    setOutdoorDuration(outdoorArr[1]);
                    setOutdoorDistance(outdoorArr[2]);
                    setOutdoorAll(outdoorArr[3])
                }     
            });
      
            const busShortestPath = findBestBusRoute(o, d);
                if (
                    busShortestPath != null && 
                    busShortestPath != 1 && 
                    busShortestPath != 0
                    ) {
                    setBusDirections(busShortestPath.route);
                    setBusRoute(busShortestPath.busRoutes);
                    setBusDuration((busShortestPath.route.length - 2) * busOneStepDuration);
                }
              
              const shelteredShortestPath = findBestShelteredRoute(o, d) 
              // currently only works for going from venue to venue not bus to bus
              if (
                    shelteredShortestPath != null && 
                    shelteredShortestPath != 1 && 
                    shelteredShortestPath != 0
                    ) {
                    // 1 is for cant find route, 0 is for invalid input
                    setShelteredDirections(shelteredShortestPath);
                    setShelteredDuration(shelteredShortestPath.length * shelteredOneStepDuration);
                // hardcoded duration for placeholder -- each step from one building to another assumed to be 3
              }
    }, [origin, destination]);

    const BackBtn = () => {
        return(
            <CustomButton 
                onPress={handleBack}
                text="Back"
            ></CustomButton>
        )
    }
     
    const renderItem = ({ item }) => {
        if (item.mode === "Outdoor") {
            return (<RouteCard 
                mode={item.mode} 
                directions={outdoorDirections} // array of string instructions
                duration={outdoorDuration}
                distance={outdoorDistance}
                all={outdoorAll}
                handler={handler}
                o={o}
                d={d}
                ></RouteCard>);
        } else if (item.mode === "Sheltered") {
            return(<RouteCard 
                mode={item.mode} 
                directions={shelteredDirections} // array of buildings to walk through 
                duration={shelteredDuration} 
                distance={null}
                handler={handler}
                all={null}
                o={o}
                d={d}
                ></RouteCard>);
        } else{
            //console.log("bus card running")
            return (<RouteCard 
                mode={item.mode} 
                directions={busDirections} // array of bus stops
                route={busRoute} // possible bus routes to take
                duration={busDuration}
                distance={null}
                handler={handler}
                all={null}
                o={o}
                d={d}
                ></RouteCard>);
        }           
    }
    
    const data = [ {id: 1, mode: "Outdoor"},
                    {id: 2, mode: "Sheltered"},
                    {id: 3, mode: "Bus"} ];

    return (    
        <View style={{flex: 2, backgroundColor: COLORS.background}}>
            {outdoorDirections && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={BackBtn}
                showsVerticalScrollIndicator={false}
                style={{padding: 10}}
            />}
            
        </View>        
    )    
}
    