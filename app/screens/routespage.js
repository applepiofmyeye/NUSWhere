import React, { useState, useEffect, useCallback } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { addToFavourites, auth, removeFromFavourites, queryFR } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function RoutesPage() {
    const navigation = useNavigation();
    console.log("in routespage");    

    const {directions, distance, duration, all, mode, origin, destination, route} = useLocalSearchParams();
    const routesArr = navigation.getState().routes;
    const params = routesArr[routesArr.length - 1].params
    console.log(params);


    const directionsArr = directions.split("/");

    


    const [isPressed, setIsPressed] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if (params) {
            const result = await queryFR(params, auth.currentUser.uid);
            const persistedState = await AsyncStorage.getItem('isPressed');
            setIsPressed(persistedState ? JSON.parse(persistedState) : result);
            }
        };
        fetchData();
    }, [params]);
      

    
      

    const favContainerColor = {
        backgroundColor: isPressed ? COLORS.pressedBtn : COLORS.unpressedBtn
    }

    const favText = isPressed ? "Remove from Favourites" : "Add to Favourites";


   

    const handleFav = useCallback(async () => {
        if (!isPressed) {
            addToFavourites(auth.currentUser.uid, params);
        } else {
            removeFromFavourites(auth.currentUser.uid, params);
        }
        const updatedState = !isPressed
        setIsPressed(updatedState);
        await AsyncStorage.setItem('isPressed', JSON.stringify(updatedState));
    }, [isPressed, params]);
      

      
      

    const FavouritesBtn = () => {
        return (
            <View style={{alignItems: "center", justifyContent: "flex-end"}}>
                <Pressable onPress={handleFav} style={[styles.favContainer, favContainerColor]}>
                    <Text style={styles.text}>{favText}</Text>
                </Pressable>
            </View>
        )
    }



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
            data={data}
            ListFooterComponent= {FavouritesBtn}>
        
                
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
    },
    favContainer: {

        width: 250,
        padding: 15,
        marginVertical : 5,

        alignItems: "center",
        borderRadius: SIZES.xLarge,
        justifyContent: "center",
    },
})
