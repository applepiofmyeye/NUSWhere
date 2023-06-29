import React from "react";
import { View, Text, FlatList, ScrollView, Animated, StyleSheet, TouchableOpacity} from "react-native";
import { findBestRoute } from "../../app/firebase";
import { COLORS, FONT, SIZES } from "../../constants";


export default function RouteCard({mode, directions, item}) { // directions will be an array
    console.log("DIRECTIONS: ", directions);
    return (    
        <TouchableOpacity 
        style={styles.routeContainer}
        >


          <Text style={styles.routeMode}>{item.mode}</Text>
          <Text style={styles.routeMode}>{directions}</Text>

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
        height: 130,
        justifyContent: "center",
        alignItems: "center"
    },

    routeMode: {
        fontFamily: FONT.iRegular,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },

    title: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xLarge + 1,
        color: COLORS.text,
        margin: 10,
    },

    titleContainer: {
        backgroundColor: COLORS.background

    }
})
