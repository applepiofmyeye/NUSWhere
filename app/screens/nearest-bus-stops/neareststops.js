/*
Map page where users will key in their go-tos.

TODO:
make this page.
*/

import React, { SafeAreaView, View, ScrollView, Text, StyleSheet, Pressable} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, FONT, SIZES } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";

import axios from "axios";
import * as Location from 'expo-location';
import { useState, useEffect } from "react";
import { GOOGLE_API } from "../../../keys";
import * as geolib from 'geolib';
import { CustomButton } from "../../../components";
import { v4 as uuidv4 } from 'uuid';








export default function NearestStops() {
    console.log("in Neareststops");
    const [lat1, setLat1] = useState(null)
    const [long1, setLong1] = useState(null)
    // const [busStopOrderedData, setBusStopOrderedData] = useState([])
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    console.log("loading: ", loading);


    const busStopJson = require("../../../data/bus-stops.json")
    const busStopData = [];
    // Access the JSON data
    for (let i = 0; i < busStopJson.length; i++) {
      const busStop = busStopJson[i];
      const busStopName = busStop.name;
      const busStopLocation = {
        id: i, 
        name: busStopName,
        latitude: busStop.location[0],
        longitude: busStop.location[1],
        routes: busStop.routes
      };
      busStopData.push(busStopLocation);
    }

    const busStopCoords = busStopData.map( x => {
        return {
            latitude: x.latitude,
            longitude: x.longitude
        }
    })

    const [showBuses, setShowBuses] = useState(new Array(busStopCoords.length).map(x => false))


    
    const [busStopOrderedData, setBusStopOrderedData] = useState([])
    

    
    useEffect(() => {
        const findUserLocation = async () => {

            
            console.log("Accessing your location..");
            let {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied.')
            }
            console.log("Accessed!");

            console.log("Getting current position..");
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true}); 

            console.log("retrieved!");

            setLat1(location.coords.latitude);
            setLong1(location.coords.longitude)
            console.log("location", location);

            console.log("latitude", location.coords.latitude);
            console.log("longitude", location.coords.longitude);

            // console.log(findDistanceBetween2());
            

            
            if (lat1 !== null) {
                try {
                    const orderedData = geolib.orderByDistance(
                        { latitude: lat1, longitude: long1 }, busStopCoords
                        )
                    .map((x) => {
                        return busStopData.find(
                            (busStop) =>
                            x.latitude === busStop.latitude && x.longitude === busStop.longitude);
                        });
          
                setBusStopOrderedData(orderedData);
                } catch (error) {
                    console.log(error);
                    console.log("lat1:", lat1);
                    console.log("long1: ", long1);
                }
               
            }


            console.log(busStopOrderedData);
            
            if (busStopOrderedData[0]) {
                console.log("busStop ordered data is ", busStopOrderedData);
                setLoading(false)
            }
            
        }

        

        if (loading) {findUserLocation();}


    },[lat1, long1])

    const getColorForRoute = (route) => {
        return route == "A1" 
               ? COLORS.busA1
               : route == "A2"
               ? COLORS.busA2
               : route == "BTC"
               ? COLORS.busBTC
               : route == "K"
               ? COLORS.busK
               : route == "D1"
               ? COLORS.busD1
               : route == "D2"
               ? COLORS.busD2
               : route == "E"
               ? COLORS.busE
               : COLORS.busL
    }



    const renderItem = (item) => {
        return (
        <Pressable 
            key={item.item.id}
            style={styles.itemContainer}
            onPress={() => setShowBuses((prevSetting) => {
                updatedState = [...prevSetting]
                previousState = updatedState[item.item.id]
                console.log(!previousState);
                updatedState[item.item.id] = !previousState
                return updatedState;
            })}>
            <Text style={styles.nameStyle}>{item.item.name}</Text>
            { showBuses[item.item.id] && 
                
                    
                <View style={styles.busRoute}>
                    {item.item.routes.map((route, index) => (
                        <View
                            key={index}
                            style={[
                            styles.routeItem,
                            { borderColor: getColorForRoute(route), borderRadius: 18, borderWidth: 3},
                            ]}
                        >
                            <Text style={styles.routeText}>{route}</Text>
                            <View 
                                style={{
                                    backgroundColor: "black",
                                    borderRadius: 5,
                                    padding: 10
                                    }}>
                                <Text style={{color: "white"}}>NA</Text>
                            </View>
                        </View>
                        
                    ))}
                </View>
            
            }            

        </Pressable>)
    }

    const Buses = () => {
        return (
            <View >
                
            </View>
        )
    }

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    headerTitle: "Nearest Bus Stops",
                    headerTitleStyle: {
                        fontFamily: FONT.iSemiB,
                        fontSize: SIZES.medium,
                        color: COLORS.text,
                    }
                }}
            />
            {busStopOrderedData &&  
            <FlatList
                data={busStopOrderedData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                refreshing={loading}
                onRefresh={() => {
                    setLoading(true)
                    setLat1(null); 
                    setLong1(null);
                }}
            />}

            {loading && !lat1 && <Text>Loading..</Text>}

            {busStopOrderedData.length === 0 && !loading &&
            <View>
                <Text>No data available.</Text>
                <CustomButton
                    text={"refresh"}
                    onPress={() => setLoading(true)}></CustomButton>

            </View>
            }

            
            

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        borderColor: COLORS.unpressedBtn,
        borderBottomWidth: 2,
        padding: 15,
        paddingVertical: 20
    },
    nameStyle: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.medium + 1,
        color: COLORS.text
    },
    busRoute: {
        fontFamily: FONT.iSemiB,
        color: COLORS.white,
        paddingTop: 20
    },
    routeItem: {
        paddingVertical: 8, 
        paddingHorizontal: 8,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    routeText: {
        fontFamily: FONT.iRegular,
        color: COLORS.text,
        fontSize: SIZES.medium + 1
    }


})

