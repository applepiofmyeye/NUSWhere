/*
Map page where users will key in their go-tos.

NOTE:
o and d is for name of bus stops
origin and destination is coordinates of bus stops

*/
import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Button, Platform, TextInput, Animated, Text, Alert } from "react-native";
import Autocomplete from "../../../components/Autocomplete";
import { Stack, useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { roomCodes, busStops, buildings } from "../../../data/venues";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from "../../../keys";




import { COLORS, SIZES } from "../../../constants";
import { CustomButton, RouteList } from "../../../components";

let o = null;
let d = null;



export default function MapPage() {
    console.log("in MapPage");

    const scrollA = useRef(new Animated.Value(0)).current;
    const handleCardDrag = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollA } } }],
        { useNativeDriver: true }
      );


    const router = useRouter();



    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showDirectionsBtn, setShowDirectionsBtn] = useState(true);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);

    // const handleCardPress = () => {
    //     router.push('./routespage')
    // }
<<<<<<< HEAD:app/screens/mappage.js
    const handler = (directions, duration, all, mode, route, directionsLength) => {
=======
    const handler = (directions, duration, all, mode, route, o, d) => {
>>>>>>> e4c9b46dbcf072c93ec836b8e658f5fafa9f16d7:app/screens/map/mappage.js
        if (!directions) { return Alert.alert("No route", "Whoops! No available route currently.", [
            {
                text: "OK",
                onPress: () => console.log("button pressed")
            }
        ])}

        if (mode === "Sheltered" && directionsLength === 1) {
            return Alert.alert("You have reached!", "You are in the building. Proceed to the floor of your destination.");
        }

        /*
        console.log(mode + directionsLength);
        if (mode === "Sheltered" && directionsLength === 1) {
            return Alert.alert("You have reached!", "You are in the building. Proceed to the floor of your destination.");
        }
        */
        // router.setParams({directions: directions, duration: duration, all: all, mode: mode, route: route})
        
        router.push({pathname: "./screens/map/routespage", 
        params: {
            origin: o,
            destination: d,
            directions: directions,
            duration: duration,
            all: all,
            mode: mode, 
            route: route},
        });
    };
    
    const handleBack = () => {
        setShowRoute(false);
        setOrigin(null);
        setDestination(null);
    }


    const handleSelectMarker = (markerLocation, isDestination, name) => {
        setMapRegion(markerLocation);
        if (isDestination) {
            setDestination(markerLocation);
            d = name;
        } else {

            setOrigin(markerLocation);
            o = name;

        }
        setSelectedMarker(markerLocation);
        setShowDirectionsBtn(true);
        (origin && destination) ? setScrollEnabled(true) : setScrollEnabled(false);

    };    

    const handleErrenousInput = () => {
        if (o === d) {
            Alert.alert("Wait a minute...", "Your current location and destination is the same! Please verify again!");
            setShowDirectionsBtn(false);
        } else {
            setShowRoute(true);
            setShowDirectionsBtn(false);
        }
    }

    // Map-related constants
    const [mapRegion, setMapRegion] = useState({
        latitude: 1.2966,
        longitude: 103.7764,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    });

<<<<<<< HEAD:app/screens/mappage.js
    /*
    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied.')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
=======


    // NOT USED CURRENTLY, but would be good to track current user location
    // const userLocation = async () => {
    //     let {status} = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied.')
    //     }
    //     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
>>>>>>> e4c9b46dbcf072c93ec836b8e658f5fafa9f16d7:app/screens/map/mappage.js
        
    // }


    // useEffect(() => {
    //     userLocation();
    // },[])

    */



    return (

        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, headerBackButtonMenuEnabled: true}}/>
                <Animated.ScrollView
                        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                        onScroll={handleCardDrag}
                        scrollEventThrottle={16}
                        style={styles.scrollableCard}
                        scrollEnabled={scrollEnabled}

                    >
            
                <Animated.View
                    style={[
                    styles.bannerContainer,
                    { transform: [{ translateY: scrollA }], },
                    ]}
                >
                    
                    <MapView style={styles.map} region = {mapRegion}>

                        {origin && <Marker coordinate={origin}></Marker>}

                        {destination && <Marker coordinate={destination} />}

                        {showRoute && <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_API}
                            strokeColor="#6644ff"
                            strokeWidth={4}
                            mode="WALKING"
                        />}
                    </MapView>

                    
                    
                </Animated.View>
                    
                    {!showRoute && 
                    <Autocomplete
                        value=""
                        containerStyle={[styles.searchContainer, {marginTop: 120}]}
                        style={{
                            backgroundColor: COLORS.background,
                            flex: 1
                        }}
                        label="Where do you wanna go?"
                        data={roomCodes.concat(busStops).concat(buildings)} // Set to the json
                        menuStyle={{backgroundColor: COLORS.background}}
                        onChange={() => {setShowRoute(false)}}
                        usage='mappage'
                        selectedMarker={selectedMarker}
                        onSelectMarker={handleSelectMarker}
                        isDestination={true}
                    />}
                    
                    {!showRoute &&
                    <Autocomplete
                        value=""
                        containerStyle={styles.searchContainer}
                        style={{
                            backgroundColor: COLORS.background,
                            flex: 1
                        }}
                        label="Where are you?"
                        data={roomCodes.concat(busStops).concat(buildings)} // Set to the json
                        menuStyle={{backgroundColor: COLORS.background}}
                        onChange={() => {setShowRoute(false)}}
                        usage='mappage'
                        selectedMarker={selectedMarker}
                        onSelectMarker={handleSelectMarker}
                        isDestination={false}
                    />}
                    {!showRoute && <View style={{flex: 10}}></View>}
                    {showRoute && <View style={{flex: 5}}></View>}

                    
                </Animated.ScrollView>
                 
                <View style={{position: "absolute", bottom: 20}}>
                        {/* 
                        button to show directions:
                        {selectedMarker && showDirectionsButton && (
                            <CustomButton text="DIRECTIONS" onPress={() => {
                                setShowRoute(true);
                                setShowDirectionsButton(false)}}/>
                        )} */}
                        {origin && destination && showDirectionsBtn && (
                            <CustomButton 
                            text="Routes" 
                            onPress={() => {
                                handleErrenousInput();
                            }}/>
                        )}
                        
                        
                </View>

                {showRoute && <RouteList 
                origin={origin} 
                destination={destination} 
                o={o} 
                d={d} 
                handler={handler}
                handleBack={handleBack}
                />}
                




                
            
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.background,
        alignItems: "center",


    },
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get('screen').height,
    },
        
    searchContainer: {
        position: "absolute",
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "column",
        backgroundColor: COLORS.background,
        width: "90%",
        alignSelf: "center",
        borderRadius: 9,
        padding: 10,
        shadowColor: "#ccc",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        justifyContent: "flex-start",
        borderColor: "black"

    },
    bannerContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    scrollableCard: {
        height: 50
    }
});



