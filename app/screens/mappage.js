/*
Map page where users will key in their go-tos.

TODO: 
autocomplete feature

*/
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Button, Platform, TextInput } from "react-native";
import Autocomplete from "../../components/Autocomplete";
import { Stack, useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { roomCodes } from "../../data/venues";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from "../../keys";




import { COLORS, SIZES } from "../../constants";
import { CustomButton } from "../../components";




export default function MapPage() {
    const router = useRouter();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null)
    const [showRoute, setShowRoute] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const directions =  () => router.push('screens/routespage')

    const handleSelectMarker = (markerLocation) => {
        setSelectedMarker(markerLocation);
        setMapRegion(markerLocation);
        setDestination(markerLocation);

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
        selectedMarker && setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        setOrigin({
            latitude: 1.2966,
            longitude: 103.7732
        });

        console.log({location})
    }

    useEffect(() => {
        userLocation();
    },[])

    



    return (

            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: false, }}/>


                <MapView style={styles.map} region = {mapRegion}>
                    {origin && <Marker coordinate={origin}></Marker>}

                    {selectedMarker && <Marker coordinate={selectedMarker} />}
                    {showRoute && <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API}
                        strokeColor="#6644ff"
                        strokeWidth={4}
                        mode="WALKING"
                    />}
                </MapView>

                <Autocomplete
                    value=""
                    containerStyle={styles.searchContainer}
                    style={{
                        backgroundColor: COLORS.background,
                    }}
                    label="Where do you wanna go?"
                    data={roomCodes} // Set to the json
                    menuStyle={{backgroundColor: COLORS.background}}
                    onChange={() => {}}
                    usage='mappage'
                    menuThenGoTo="./directions"
                    selectedMarker={selectedMarker}
                    onSelectMarker={handleSelectMarker}
                />

                <View style={{position: "absolute", bottom: 20}}>
                    {selectedMarker && showButton && (
                        <CustomButton text="DIRECTIONS" onPress={() => {
                            setShowRoute(true);
                            setShowButton(false)}}/>
                    )}
                    
                </View>
                
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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

    }
});



