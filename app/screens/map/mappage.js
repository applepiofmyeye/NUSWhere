/*
Map page where users will key in their go-tos.

NOTE:
o and d is for name of bus stops
origin and destination is coordinates of bus stops

*/
import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions,Platform, Animated, Alert } from "react-native";
import Autocomplete from "../../../components/Autocomplete";
import { Stack, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { roomCodes, buildings } from "../../../data/venues";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from "../../../keys";
import { COLORS } from "../../../constants";
import { CustomButton, RouteList } from "../../../components";

let o = null;
let d = null;

export default function MapPage() {
<<<<<<< HEAD:app/screens/mappage.js
    //console.log("in MapPage");
=======
    const venuesData = require("../../../data/venues.json");
    const buildingData = require("../../../data/buildings.json");
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef:app/screens/map/mappage.js

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

    const handler = (directions, duration, all, mode, route, o, d) => {
        if (!directions || (mode === 'Bus' && !route)) { return Alert.alert("No route", "Whoops! No available route currently.", [
            {
                text: "OK",
                onPress: () => console.log("button pressed")
            }
        ])} 
        
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

    };    

    // Map-related constants
    const [mapRegion, setMapRegion] = useState({
        latitude: 1.2966,
        longitude: 103.7764,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    });

    return (

        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, headerBackButtonMenuEnabled: true}}/>
                 <Animated.ScrollView
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
                        data={roomCodes.concat(buildings)} // Set to the json
                        menuStyle={{backgroundColor: COLORS.background}}
                        onChange={() => {setShowDirectionsBtn(false)}}
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
                        data={roomCodes.concat(buildings)} // Set to the json
                        menuStyle={{backgroundColor: COLORS.background}}
                        onChange={() => {setShowDirectionsBtn(false)}}
                        usage='mappage'
                        selectedMarker={selectedMarker}
                        onSelectMarker={handleSelectMarker}
                        isDestination={false}
                    />}
                    {!showRoute && <View style={{flex: 10}}></View>}
                    {showRoute && <View style={{flex: 5}}></View>}

                    
                </Animated.ScrollView>
                 
                <View style={{position: "absolute", bottom: 20}}>
                        {origin != destination && origin && destination && showDirectionsBtn && (
                            <CustomButton 
                            text="Routes" 
                            onPress={() => {
                                if (origin.latitude != destination.latitude && origin.longitude != destination.longitude) {
                                    let originBuilding = null;
                                    let destinationBuilding = null;
                                    if (venuesData[o] != null) {
                                        originBuilding = venuesData[o].building;
                                    }
                                    if (buildingData[o] != null) {
                                        originBuilding = buildingData[o].name;
                                    }
                                    if (venuesData[d] != null) {
                                        destinationBuilding = venuesData[d].building;
                                    }
                                    if (buildingData[d] != null) {
                                        destinationBuilding = buildingData[d].name;
                                    }
                                    console.log('originBuilding', originBuilding);
                                    console.log('destinationbuilding', destinationBuilding);
                                    if (originBuilding !== null && destinationBuilding !== null && originBuilding === destinationBuilding) {
                                        setShowDirectionsBtn(false);
                                        return Alert.alert("You have reached!", "You are in the building. Proceed to the floor of your destination, " + d);
                                    } else {
                                        setShowRoute(true);
                                        setShowDirectionsBtn(false);
                                    }
                                } else if (origin.latitude === destination.latitude && origin.longitude === destination.longitude) {
                                    return Alert.alert("Repeated venues", "Please enter different locations", [{
                                        text: "OK",
                                        onPress: () => console.log("button pressed")
                                    }])
                                } 
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
}

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