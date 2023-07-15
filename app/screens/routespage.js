import React, { useState, useEffect, useCallback } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { addToFavourites, auth, removeFromFavourites, queryFR, photosStorage } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";




export default function RoutesPage() {
    const navigation = useNavigation();
    console.log("in routespage");    

    // Get params passed through route
    const {directions, distance, duration, all, mode, origin, destination, route} = useLocalSearchParams();
    const routesArr = navigation.getState().routes;
    const params = routesArr[routesArr.length - 1].params

    // Display directions
    const directionsArr = directions.split("/");

    // Button rendering and logic
    const [pressedStates, setPressedStates] = useState({});
    const [isPressed, setIsPressed] = useState(false)

    // Image rendering (Sheltered Routes)
    const [url, setUrl] = useState([])

    const [isLoading, setIsLoading] = useState(true);





    useEffect(() => {
        const fetchPhotoData = async () => {
            const storage = getStorage();
            const photoRef = ref(storage, `AS6/COM1`);
            console.log(`photos-linkways/${origin}/${destination}`);
            
            await listAll(photoRef)
                .then((result) => {
                    const promises = result.items.map(x => {
                        getDownloadURL(x).then(photoUrl => {
                            console.log(photoUrl);
                            setUrl((prevUrl) => [...prevUrl, photoUrl])
                            console.log("in setURL");
                        })
                    })
                    if (promises.length > 0) {
                        Promise.all(promises)
                            .then(() => setIsLoading(false))
                            .catch((error) => console.log(error));
                    } else {
                        setIsLoading(false);
                    }
                    
                })

                
            // await getDownloadURL(photoRef).then(photoUrl => setUrl(photoUrl))
           
            
        };

        const fetchFavouritesData = async () => {
            if (params) {
                const result = await queryFR(params, auth.currentUser.uid);
                const persistedState = await AsyncStorage.getItem('isPressed');
                console.log(result);
                setIsPressed(persistedState ? JSON.parse(persistedState) : result);
            }
        }

        fetchPhotoData()
        fetchFavouritesData();
        console.log(url);

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

            
                {mode == "Sheltered" && (isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={styles.imageContainer}>
                    {url.length > 0 ? (
                        <Image
                            source={{ uri: url[item.id] }}
                            resizeMode="stretch"
                            style={styles.image}
                        />
                        ) : (
                        <Text>No image available</Text>
                    )}
                    </View>
                ))}
            

            


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
                alignSelf: "center",
                paddingBottom: 10
                }}>{destination}</Text>
            
            
            <FlatList
            renderItem={renderItem}
            data={data}
            ListFooterComponent= {isPressed != null && FavouritesBtn}>
            </FlatList>


            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: 8,
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
    imageContainer: {
        alignItems: "center",
        padding: 20,
        paddingBottom: 30,
        height: 300,
    },
    image: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
})
