/*
Map page where users will key in their go-tos.

NOTE:
o and d is for name of bus stops
origin and destination is coordinates of bus stops

*/
import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Button, Platform, TextInput, Animated, Text } from "react-native";
import Autocomplete from "../../components/Autocomplete";
import { Stack, useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { roomCodes, busStops } from "../../data/venues";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from "../../keys";




import { COLORS, SIZES } from "../../constants";
import { CustomButton, RouteList } from "../../components";
import RoutesPage from "./routespage";

let o = null;
let d = null;


export default function MapPage() {
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

    // Map-related constants
    const [mapRegion, setMapRegion] = useState({
        latitude: 1.2966,
        longitude: 103.7764,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    });

    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        
        // !origin && location && setOrigin({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude
        // });

        console.log({location})
    }

    useEffect(() => {
        userLocation();
    },[])

    



    return (

        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, }}/>
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
                        data={roomCodes.concat(busStops)} // Set to the json
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
                        data={roomCodes.concat(busStops)} // Set to the json
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
                                setShowRoute(true);
                                setShowDirectionsBtn(false);
                            }}/>
                        )}
                        
                        
                </View>

                {showRoute && <RouteList origin={origin} destination={destination} o={o} d={d} />}
                




                
            
            
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



