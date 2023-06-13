/*
Map page where users will key in their go-tos.

TODO: 
autocomplete feature

*/
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Button, Platform, TextInput } from "react-native";
import { Stack, useRouter } from "expo-router";





import { COLORS, SIZES } from "../../constants";
import Directions from "./directions";
import MapPage from "./mappage";




export default function MapContainer() {

    return (

            <Stack.Navigator>
                <Stack.Screen component={MapPage}></Stack.Screen>
                <Stack.Screen component={Directions}></Stack.Screen>
            </Stack.Navigator>
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



