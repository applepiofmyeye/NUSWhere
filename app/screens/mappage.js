/*
Map page where users will key in their go-tos.

TODO:
make this page.
*/
import { useState, useEffect } from "react";
import React, { View, ScrollView, StyleSheet, Dimensions, Button, Platform, TextInput } from "react-native";
import { Stack, useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';


import { COLORS, SIZES } from "../../constants";


export default function MapPage() {
    // Map-related constants
    const [mapRegion, setMapRegion] = useState({
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    });

    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
        });
        console.log({location})
    }

    useEffect(() => {
        userLocation();
    },[])

    // Autocomplete related constants
    



    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, }}/>

            <MapView style={styles.map} region={mapRegion}>
            </MapView>

            <View style={styles.searchBox}>
                <TextInput 
                placeholder="Where do you wanna go?"
                autoCapitalize="none"
                style={{flex: 1, padding: 2, fontSize: SIZES.medium}}></TextInput>

            </View>
            
            <Button title="Refresh" onPress={userLocation}/>
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
    searchBox: {
        position: "absolute",
        marginTop: Platform.OS === "ios" ? 40 : 20,
        flexDirection: "row",
        backgroundColor: COLORS.background,
        width: "90%",
        alignSelf: "center",
        borderRadius: 9,
        padding: 15,
        shadowColor: "#ccc",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        justifyContent: "flex-start"
        
    }
});


