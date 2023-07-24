import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import styles from "./frlist.style";
import { getFavouriteRoutes } from "../../../app/firebase";
import { AuthStore } from "../../../store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";


export default function FRList() {
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState([]);

    let originArr = [];
    let destinationArr = [];
    let length = 0;
    let directionsArr = [];
    let routeArr =[];

    const router = useRouter();

    useEffect(() => {
        const loadFavouriteRoutes = async () => {
            const favRoutesParam =  await getFavouriteRoutes(AuthStore.getRawState().user.uid);
            if (favRoutesParam[0]) {
                const savedData = [];
                originArr = favRoutesParam[0].map(y => y.origin.stringValue);
                destinationArr = favRoutesParam[0].map(y => y.destination.stringValue);
                length = originArr.length;

                let modeArr = favRoutesParam[0].map(y => y.mode.stringValue);
                let hrefDirectionsArr = favRoutesParam[0].map(y => y.directions.stringValue);
                directionsArr = favRoutesParam[0].map(y => y.directions.stringValue.split("/")); // 2d array or routes and dir
                let distanceArr = favRoutesParam[0].map(y => y.distance ? y.distance.stringValue : null)
                routeArr = favRoutesParam[0].map(y => y.route ? y.route.stringValue : null);
                let durationArr = favRoutesParam[0].map(y => y.duration ? y.duration.stringValue : "")

                for (let i = length - 1; i >= 0; i--) {
                    savedData.push({
                        id: i, 
                        origin: originArr[i], 
                        destination: destinationArr[i], 
                        mode: modeArr[i], 
                        directions: directionsArr[i],
                        distance: distanceArr[i],
                        route: routeArr[i],
                        hrefDirections: hrefDirectionsArr[i],
                        duration: durationArr[i]
                    });
                }
                setData(savedData);
                setRefresh(false);
            } else {
                setRefresh(false);
            }
        }
        loadFavouriteRoutes();
    }, [data, refresh])

    const handler = (directions, duration, all, mode, route, o, d) => {
        if (!directions) { return Alert.alert("No route", "Whoops! No available route currently.", [
            {
                text: "OK",
                onPress: () => console.log("button pressed")
            }
        ])}
        // router.setParams({directions: directions, duration: duration, all: all, mode: mode, route: route})
        router.push({pathname: './screens/map/routespage', 
        params: {
            origin: o,
            destination: d,
            directions: directions,
            duration: duration,
            all: all,
            mode: mode, 
            route: route},
            
        });
      };

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={styles.routeContainer}
        onPress={() => item.route == null 
            ? handler(item.hrefDirections, item.duration, null, item.mode, "", item.origin, item.destination) 
            : handler(item.hrefDirections, item.duration, null, item.mode, item.route, item.origin, item.destination)}
        >
            <Text style={styles.routeName}>{item.origin} to {item.destination}</Text>
            <Text style={styles.modeName}>{item.mode}</Text>

        </TouchableOpacity>
    );

    return (      
        <SafeAreaView style={{flex: 20}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Favourite Routes
                </Text>     
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{
                    color: COLORS.text, 
                    fontSize: SIZES.medium, 
                    fontFamily: FONT.iLight,
                    margin: 10
                    }}>No favourites added.</Text>}
                refreshing={refresh}
                onRefresh={() => setRefresh(true)}
            />  
        </SafeAreaView>  
    )
}