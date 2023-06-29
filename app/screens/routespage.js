/*
Directions page
*/

import React, { SafeAreaView, View, ScrollView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants/theme";
import { GOOGLE_API } from "../../keys";
import { findBestRoute } from "../firebase";
import { Dimensions } from "react-native";


export default function RoutesPage({o, d}) {
    const br = findBestRoute(o, d);
    console.log("----------------------------------")
    console.log("BESTROUTE IN ROUTESPAGE: ", br)
    console.log(o, d)
    const brStops = br == null ? null : br.busRoutes[0];
    const brRoute = br == null ? null : br.route;
    console.log(brRoute);

    
    return (
    
        <View 
        style={{
            flex: 1,
            backgroundColor: COLORS.text,
            marginTop: -1000,
            paddingTop: 1000,
            alignItems: 'center',
            overflow: 'hidden',
            }}>

               
            <Text style={{color: COLORS.text}}>{brRoute}</Text>
        </View>
            
    );
}



