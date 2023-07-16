import React, { useState, useEffect } from "react";
import { Stack, useNavigation, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStore } from "../../store";
import { db } from "../firebase";
import { getDoc, setDoc, doc, updateDoc, deleteField } from "firebase/firestore";

export default function RoutesPage() {
    const { user } = AuthStore.useState();
    const [favorite, setFavorite] = useState(false); // whether this data is saved
    const [favoriteRouteName, setFavoriteRouteName] = useState(false); // what the data yet to be saved should be named after
    const [dataFieldName, setDataFieldName] = useState(''); // to remove the data of this particular route
    const { directions, distance, duration, all, mode, origin, destination } = useLocalSearchParams();
    const directionsArr = directions.split("/");
    const favRef = doc(db, 'favorites/' + user.uid);

    let data = [];
    let directionString = '';
    for (let i = 0; i < directionsArr.length; i++) {
        data[i] = {
            id: i,
            text: directionsArr[i],
            icon: mode == "Bus" ? "bus" : "walk"
        }
        if (i === directionsArr.length - 1) {
            directionString += directionsArr[i];
        } else {
            directionString += directionsArr[i] + ", ";
        }
    }

    useEffect(() => {
        checkSavedData();
    }, []);

    const checkSavedData = async () => {
        try {
            const savedData = await getDoc(favRef);
            if (savedData.exists()) {
                const data = savedData.data();
                const fieldCount = Object.keys(data).length;
                console.log(fieldCount);
                if (fieldCount === 0) {
                    setFavoriteRouteName('Route1');
                }
                let count = 0;
                let i = 1;
                while (count !== fieldCount) { 
                    const fieldName = 'Route' + i;
                    const field = data[fieldName];
                    if (field !== undefined) {
                        const o = data[fieldName][0];
                        const d = data[fieldName][1];
                        const dir = data[fieldName][2];
                        if (o === origin && d === destination && dir === directionString) {
                            setFavorite(true);
                            setDataFieldName(fieldName);
                            break;
                        } else {
                            i++;
                            count++;
                            setFavoriteRouteName('Route' + i);
                        }
                    } else {
                        i++;
                        count++;
                        setFavoriteRouteName(fieldName);
                    }
                } 
            } else {
                setFavoriteRouteName('Route1');
            }
        } catch (error) {
            console.error("Error checking saved route data:", error);
        }
    };

    const handleAddToFavorites = async () => {
        let dataToSave = [];
        dataToSave[0] = origin;
        dataToSave[1] = destination;
        dataToSave[2] = directionString;
        dataToSave[3] = favoriteRouteName;
        dataToSave[4] = mode;
        console.log(directionString);
        const routeData = {
            [favoriteRouteName]: dataToSave
        };
        try {
            await setDoc(favRef, routeData, { merge : true });
            setFavorite(true);
            setDataFieldName(favoriteRouteName); // if user clicks twice while at the same page
        } catch (error) {
            console.error("Error saving route data:", error);
        }
    };

    const handleRemoveFavorites = async () => {
        try {
            await updateDoc(favRef, {
                [dataFieldName]: deleteField()
            })
            setFavorite(false);
            setFavoriteRouteName(dataFieldName); // the dataFieldName is now available to be saved under.
        } catch (error) {
            console.error("Error deleting route data:", error);
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
        <Stack.Screen
        options={{
            headerTitle: origin + " to " + destination,
            headerRight: () => (
            <View style={{ flexDirection: 'column', alignItems: "center" }}>
                <TouchableOpacity onPress={favorite ? handleRemoveFavorites : handleAddToFavorites}>
                    <Ionicons name='heart-outline' size={30} color={favorite ? '#FF0000' : '#000000'}/>
                </TouchableOpacity>
            </View>
            ),
            headerTintColor: COLORS.text,
            headerStyle: {
                backgroundColor: COLORS.background
            }
        }}
        />

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
