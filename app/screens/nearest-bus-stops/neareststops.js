import React, { SafeAreaView, View, Text, StyleSheet, Pressable, Alert} from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";
import * as Location from 'expo-location';
import { useState, useEffect} from "react";
import * as geolib from 'geolib';
import { CustomButton } from "../../../components";


export default function NearestStops() {
    console.log("in Neareststops");
    const [loading, setLoading] = useState(true);
    const [refreshVisible, setRefreshVisible] = useState(false);

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

    async function getLocationAsyncWithTimeout() {
        const locationPromise = Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      
        try {
            const location = await Promise.race([
                locationPromise,
                new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('Unable to retrieve location. Please refresh.')), 10000);
                }
                )
            ]);
            console.log('Location:', location);
            setLoading(false)
            return location;
        } catch (error) {
            // Handle the error if the location couldn't be obtained within the specified timeout
            Alert.alert("Request timeout", error.message);
            setLoading(false);
            setBusStopOrderedData(busStopData);
            setRefreshVisible(true);
        }
      }
    
    const findUserLocation = async () => {
	
        try {
            let {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Location Access',
                    'Permission to access location was denied. The bus stops displayed will not be accurately near to your location. ' +
                    'Allow location access in your phone settings for better functionality.'
                );
                setBusStopOrderedData(busStopData);
                setLoading(false);
            } else {
                getLocationAsyncWithTimeout().then(loc => {
                    const orderedData = geolib.orderByDistance(
                        { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
                        busStopCoords
                    ).map((x) => {
                    return busStopData.find(
                            (busStop) =>
                            x.latitude === busStop.latitude && x.longitude === busStop.longitude
                        );
                    });
                    setBusStopOrderedData(orderedData);
                    setLoading(false);
                }).catch(error => {console.log("Error:", error);});
            } 
        } catch (error) {
            console.log("Error:", error);
        }
        
    }

    const onRefresh = () => {
        setLoading(true);
        setRefreshVisible(false)
        findUserLocation();
    }

    useEffect(() => {
        findUserLocation();
    },[]);

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
            />}
            
            {loading && <Text>Loading..</Text>}

            <CustomButton
                    text={"REFRESH"}
                    onPress={() => onRefresh()}></CustomButton>

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

