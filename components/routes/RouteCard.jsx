import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, Animated, StyleSheet, TouchableOpacity} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons"

function secToMin(x) {
    return x == null ? "No timing available" : x ;
}



export default function RouteCard({mode, directions, duration, route, all, handler}) { // directions will be an array
    
    console.log(directions);

    const formattedDirections = !directions
    ? ""
    : directions.map(x => x.trim()).join("\n");

    const hrefDirections = !formattedDirections
    ? ""
    : formattedDirections.replace(/\n/g, "%2F");

    console.log(formattedDirections);
    console.log(hrefDirections);
    


    const displayedDirections = !directions             
                           ? "No available route."
                           : mode == "Outdoor" 
                           ? "Route available. Total duration: " + secToMin(duration)
                           : mode == "Sheltered" 
                           ? "Route available. Total duration: " + secToMin(duration) + "s"
                           : "Route available. Total stops: " + directions.length + "\nBus Route: " + route.map(x => " " + x)


    let formattedDuration = mode == "Outdoor" ? duration : duration + "s"
    
                        
        
        
    
    
    return (    
        <TouchableOpacity 
        style={styles.routeContainer}
        onPress={() => route == null 
            ? handler(hrefDirections, formattedDuration, all, mode, "") 
            : handler(hrefDirections, formattedDuration, all, mode, route)}
        >
        <View style={{flexDirection: "row"}}>
            <View>
                <Text style={styles.routeMode}>{mode}</Text>
                <Text style={styles.displayedDirections}>{displayedDirections}</Text>
            </View>
        </View>
        
          {/* <Text style={styles.routeDirections}>{formattedDirections}</Text> */}

        
     
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    routeContainer: {
        borderRadius: 18,
        backgroundColor: COLORS.secondary,
        padding: 0,
        borderColor: COLORS.accent,
        borderWidth: 1,
        margin: 5,
        width: 380,
        height: 150,
        justifyContent: "center",

    },
    routeMode: {
        fontFamily: FONT.pBold,
        fontSize: SIZES.large,
        color: COLORS.text,
        textAlign: "left",
        paddingLeft: 10
    },

    routeDirections: {
        fontFamily: FONT.iRegular,
        fontSize: SIZES.medium,
        color: COLORS.text,
        textAlign: "left",
        paddingLeft: 10

    },

    title: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xLarge + 1,
        color: COLORS.text,
        margin: 10,
    },

    titleContainer: {
        backgroundColor: COLORS.background

    },
    displayedDirections: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.medium,
        color: COLORS.text,
        textAlign: "left",
        paddingLeft: 10
    }
})
