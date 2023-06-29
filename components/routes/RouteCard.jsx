import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, Animated, StyleSheet, TouchableOpacity} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

function secToMin(x) {
    return x == null ? "No timing available" : x;
}

export default function RouteCard({mode, directions, duration, route, handler}) { // directions will be an array
    const formattedDirections = !directions
                                ? ""
                                : mode == "Outdoor" 
                                ? directions.map(x => x[0] +"\n")
                                : directions.map(x => x + "\n")
    const displayedDirections = !directions             
                                ? "No available route."
                                : mode == "Outdoor" 
                                ? "Route available. Total duration: " + secToMin(duration)
                                : mode == "Sheltered" 
                                ? "Route available. Total duration: " + secToMin(duration) + "s"
                                : "Route available. Total duration: " + secToMin(duration) + "s" + "\nBus Route: " + route
                                
    return (    
        <TouchableOpacity 
        style={styles.routeContainer}
        >


          <Text style={styles.routeMode}>{mode}</Text>
        <Text style={styles.displayedDirections}>{displayedDirections}</Text>
          <Text style={styles.routeDirections}>{formattedDirections}</Text>

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
