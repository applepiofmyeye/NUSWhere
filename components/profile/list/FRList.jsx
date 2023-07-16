import React, { useEffect, useState } from "react";
import { View, Text, FlatList} from "react-native";
import styles from "./frlist.style";
import { getFavouriteRoutes, auth } from "../../../app/firebase";
import RouteCard from "../../routes/RouteCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";


export default function FRList() {
    const [refresh, setRefresh] = useState(false)

    
    let originArr = [];
    let destinationArr = [];
    let data = [];
    let length = 0;
    let mode = "";
    let directionsArr = [];
    let duration = "";
    let routeArr =[];

    const router = useRouter();

    
    

    useEffect(() => {
        getFavouriteRoutes(auth.currentUser.uid).then(x => {
            if (x[0]) {
                originArr = x[0].map(y => y.origin.stringValue);
                destinationArr = x[0].map(y => y.destination.stringValue);
                length = originArr.length;


                modeArr = x[0].map(y => y.mode.stringValue);
                hrefDirectionsArr = x[0].map(y => y.directions.stringValue);
                directionsArr = x[0].map(y => y.directions.stringValue.split("/")); // 2d array or routes and dir
                distanceArr = x[0].map(y => y.distance ? y.distance.stringValue : null)
                routeArr = x[0].map(y => y.route ? y.route.stringValue : null);
                durationArr = x[0].map(y => y.duration ? y.duration.stringValue : "")


                for (let i = 0; i < length; i++) {
                    data.push({
                        id: i, 
                        origin: originArr[i], 
                        destination: destinationArr[i], 
                        mode: mode[i], 
                        directions: directionsArr[i],
                        distance: distanceArr[i],
                        route: routeArr[i],
                        hrefDirections: hrefDirectionsArr[i],
                        duration: duration[i]
                    });
                }
                
            } 
            
            
        }).then(setRefresh(false));
        

    }, [refresh])

    const handler = (directions, duration, all, mode, route, o, d) => {
        if (!directions) { return Alert.alert("No route", "Whoops! No available route currently.", [
            {
                text: "OK",
                onPress: () => console.log("button pressed")
            }
        ])}
        // router.setParams({directions: directions, duration: duration, all: all, mode: mode, route: route})
        router.push({pathname: './screens/routespage', 
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
        
        

        // <RouteCard 
        // mode={item.mode}
        // directions={directions}
        // duration={duration.slice(0, str.length - 1)}
        // distance={distance}
        // handler={handler}/>
    );

    return (      
        <SafeAreaView style={{flex: 10}}>
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