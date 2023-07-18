import React, { useState, useEffect, useCallback } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../../constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { addToFavourites, auth, removeFromFavourites, queryFR, photosStorage } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';




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
    const [isPressed, setIsPressed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(true)


    // Image rendering (Sheltered Routes)
    const [url, setUrl] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(0)





    useEffect(() => {
        const fetchPhotoData = async () => {
            const storage = getStorage();
            for (let i = 0; i < directionsArr.length - 1; i ++) {
                var j = 0;
                console.log(directionsArr);
                const photoRef = ref(storage, `${directionsArr[i]}/${directionsArr[i + 1]}`);
                await listAll(photoRef)
                .then((result) => {
                    const promises = result.items.map(x => {
                        getDownloadURL(x).then(photoUrl => {
                            setUrl((prevUrl) => {
                                const updatedUrl = [...prevUrl];
                                updatedUrl[i][j] = photoUrl;
                                return updatedUrl;
                            })
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
                j++;

            }
            
            
            

                
            // await getDownloadURL(photoRef).then(photoUrl => setUrl(photoUrl))
           
            
        };

        const fetchFavouritesData = () => {
            if (params) {
              setLoading(true); // Set loading to true before fetching data
      
              queryFR(params, auth.currentUser.uid)
                .then((querySnapshot) => {
                    let queryResult = false;
                    querySnapshot.forEach((doc) => {
                        queryResult = true;
                    });
                    setIsPressed(queryResult);
                    setLoading(false); // Set loading to false after fetching data
                })
                .catch((error) => {
                    // Handle any error that occurred during the query
                    console.log(error);
                    setLoading(false); // Set loading to false in case of an error
                });
            }
        };

        fetchPhotoData();
        fetchFavouritesData();

    }, []);
      

    
      

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
        setIsPressed(!isPressed);
    }, [isPressed]);
      

      
      

    const FavouritesBtn = () => {
        if (loading) {
            return (
                <Text style={{
                    color: COLORS.text, 
                    fontSize: SIZES.medium, 
                    fontFamily: FONT.iLight,
                    margin: 10
                    }}>Loading..</Text>
            )
        }
        return (
            <View style={{alignItems: "center", justifyContent: "flex-end"}}>
                <Pressable onPress={handleFav} style={[styles.favContainer, favContainerColor]}>
                    <Text style={styles.text}>{favText}</Text>
                </Pressable>
            </View>
        )
    }




    // Direction Steps data
    let data = [];
    for (let i = 0; i < directionsArr.length; i ++) {
        data[i] = {
            id: i,
            text: directionsArr[i],
            icon: "radio-button-off"  // currently a simple one where a whole page will have the same mode
        }
    }

    // Sheltered walkways photo data for flatlist
    let photoFlatListData =[]
    if (!isLoading) {
        for (let i = 0; i < url.length - 1; i++) {
            for (let j = 0; j < url[i].length; i++) {
                photoFlatListData[i][j] = {
                    i: i,
                    j: j,
                    uri: url[i][j]
                } 
            }
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
                <Ionicons name={item.icon} size={23} color={COLORS.accent}/> 
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
{/* 
                {mode == "Sheltered" && (isLoading 
                ? ( <Text>Loading...</Text> ) 
                : ( url.length > 0 
                    ? ( <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: url[item.id] }}
                                resizeMode="stretch"
                                style={styles.image}
                            />
                        </View> ) 
                    : ( <Text>No image available</Text> )
                ))} */}

                {mode == "Sheltered" && (isLoading 
                ? ( <Text>Loading...</Text> ) 
                : ( url.length > 0 
                    ? ( <View>
                        <View style={styles.imageContainer}>
                            <FlatList
                                data={photoFlatListData}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                renderItem={ 
                                    (photoItem) => {
                                        <Image
                                        source={{ uri: photoFlatListData[photoItem.i][photoItem.j]}}
                                        resizeMode="stretch"
                                        style={styles.image}
                                        />
                                    }
                                
                                }
                            
                            
                            />
                            
                        </View> 
                        <AnimatedDotsCarousel
                        length={directionsArr.length}
                        currentIndex={carouselIndex}
                        maxIndicators={4}
                        interpolateOpacityAndColor={true}
                        activeIndicatorConfig={{
                            color: COLORS.accent,
                            margin: 3,
                            opacity: 1,
                            size: 8,
                        }}
                        inactiveIndicatorConfig={{
                            color: 'white',
                            margin: 3,
                            opacity: 0.5,
                            size: 8,
                        }}
                        decreasingDots={[{
                            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
                            quantity: 1,
                        },
                        {
                            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
                            quantity: 1,
                        },
                        ]}
                    />
                    </View>) 
                    : ( <Text>No image available</Text> )
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
        marginLeft: 8
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
