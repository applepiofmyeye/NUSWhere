import React from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import Ionicons from 'react-native-vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";




export default function RoutesPage() {
    console.log("in routespage");    

    const {directions, distance, duration, all, mode} = useLocalSearchParams();
    const directionsArr = directions.split("/");


    let data = [];
    for (let i = 0; i < directionsArr.length; i ++) {
        data[i] = {
            id: i,
            text: directionsArr[i],
            icon: mode == "Bus" ? "bus" : "walk"  // currently a simple one where a whole page will have the same mode
        }

    }


    const renderItem = ({item}) => (
        <View>
            <View style={{flexDirection: 'row'}}>
            <View style={styles.vertLine}></View>
            {/* <Ionicons icon={item.icon}></Ionicons> */}
            <Text style={styles.textStyle}>{item.text}</Text>
            </View>
            <View style={styles.vertLine}></View>

        </View>
        
    )


    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
            }} />

            <FlatList
            renderItem={renderItem}
            data={data}>
            </FlatList>
            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        padding: 8,
    },
    vertLine: {
        width: 5,
        height: "100%",
        backgroundColor: COLORS.accent,
    },
    textStyle: {
        backgroundColor: COLORS.background,
        color: COLORS.text,
        paddingLeft: 10,
        fontSize: SIZES.medium
    }
})
