import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

function secToMin(x) {
    return x == null ? "No timing available" : x + 's';
}

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.9;

export default function RouteCard({mode, directions, duration, route, all, handler, o, d}) { // directions will be an array

    const formattedDirections = !directions
    ? ""
    : directions.map(x => x.trim()).join("\n");

    const hrefDirections = !formattedDirections
    ? ""
    : formattedDirections.replace(/\n/g, "%2F");    

    const displayedDirections = directions == null             
                           ? "No available route."
                           : mode == "Outdoor" 
                           ? "Total duration: " + duration
                           : mode == "Sheltered" 
                           ? "Total duration: " + secToMin(duration) 
                           : route.length == 0
                           ? "No available route."
                           : "Total stops: " + (directions.length - 2) + "\nBuses to take: " + route + "\nTotal duration: " + secToMin(duration)

    let formattedDuration = mode == "Outdoor" ? duration : duration == null ? duration : duration+ "s"
    
    return (    
        <TouchableOpacity 
        style={styles.routeContainer}
        onPress={() => route == null || route.length == 0
            ? handler(hrefDirections, formattedDuration, all, mode, "", o, d) 
            : handler(hrefDirections, formattedDuration, all, mode, route, o, d)}
        >
            <View style={{flexDirection: "row"}}>
                <View>
                    <Text style={styles.routeMode}>{mode}</Text>
                    <Text style={[styles.displayedDirections, {fontFamily: FONT.iSemiB }]}>{displayedDirections}</Text>
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
        width: buttonWidth,
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
            fontSize: SIZES.medium,
            color: COLORS.text,
            textAlign: "left",
            paddingLeft: 10
    }   
})
