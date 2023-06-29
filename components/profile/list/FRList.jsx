import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "./frlist.style";


export default function FRList() {
    /*
    TODO: add a favouriteRoutes attribute to each user / store in firestore and query.
    const data = [ {origin: COM1 destination: Temasek Hall} ]
    */

    const data = [
        { id: 1, origin: "COM1", destination: "Temasek Hall" },
        { id: 2, origin: "KR MRT", destination: "UTown Gym" }
      ];
    
      const renderItem = ({ item }) => (
        <View style={styles.routeContainer}>
          <Text style={styles.routeName}>
            {item.origin} to {item.destination}
          </Text>
        </View>
      );
    
      return (
        <View style={{ flex: 6 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Favourite Routes</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
}
