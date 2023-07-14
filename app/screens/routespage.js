import React, { useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";




export default function RoutesPage() {
    console.log("in routespage");    

    const {directions, distance, duration, all, mode, origin, destination} = useLocalSearchParams();
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


        <View style={styles.container}>


            <View style={{flexDirection: 'row'}}>
                <View style={styles.vertLine}/>
                <View >
                    <Text style={styles.textStyle}> </Text>
                </View>
            </View>


            <View style={{flexDirection: 'row'}}>
                <Ionicons name={item.icon} size={20} color={COLORS.accent}/> 
                <View >
                    <Text style={styles.textStyle}>{item.text}</Text>
                </View>
            </View>


            <View style={{flexDirection: 'row'}}>
                <View style={styles.vertLine}/>
                <View >
                    <Text style={styles.textStyle}> </Text>
                </View>
            </View>


    </View>
        

    )


   




    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                headerTitle: origin + " to " + destination,
                headerTintColor: COLORS.text
            }} />

            <Text style={{
                fontSize: SIZES.xLarge,
                color: COLORS.text,
                fontFamily: FONT.pSemiB,
                alignSelf: "center"

                }}>{destination}</Text>
            <View style={{
                alignItems: "center", 
                padding: 20,
                paddingBottom: 30,
                height: 300
                }}>

                <Image 
                source={require('../../assets/images/NUS.png')} 
                resizeMode="stretch" 
                style={{
                    borderRadius: 10
                    }}
                />
            </View>
            


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
        fontSize: SIZES.medium,
        fontFamily: FONT.fBedium
    }
})
