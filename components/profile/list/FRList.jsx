import React, { useEffect, useState} from "react";
import { View, Text, FlatList, Modal, Pressable, Alert} from "react-native";
import styles from "./frlist.style";
import { AuthStore } from "../../../store";
import { db } from "../../../app/firebase";
import { getDoc, setDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function FRList() {
    /*
    TODO: add a favouriteRoutes attribute to each user / store in firestore and query.
    const data = [ {origin: COM1 destination: Temasek Hall} ]
    */
    const { user } = AuthStore.useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [routeDirection, setRouteDirection] = useState('');
    const [routeMode, setRouteMode] = useState('');
    const [routeId, setRouteId] = useState('');
    const [favoriteRouteList, setFavoriteRouteList] = useState([]);
    const favRef = doc(db, 'favorites/' + user.uid);

    useEffect(() => {
        retrieveData();
    }, [favoriteRouteList]);

    const retrieveData = async () => {
        //console.log("Retrieving Data");
        try {
            const savedData = await getDoc(favRef);
            if (savedData.exists()) {
                const data = savedData.data();
                const fieldCount = Object.keys(data).length;
                let count = 0;
                let i = 1;
                const updatedList = [];
                while (count !== fieldCount) { 
                    const fieldName = 'Route' + i;
                    const field = data[fieldName];
                    if (field !== undefined) {
                        const o = data[fieldName][0];
                        const d = data[fieldName][1];
                        const dir = data[fieldName][2];
                        const name = data[fieldName][3];
                        const m = data[fieldName][4];
                        //console.log(name);
                        updatedList.push({id: name, origin: o, destination: d, direction: dir, mode: m });
                        count++;
                        i++;
                    }
                }
                setFavoriteRouteList(updatedList);
            }
        } catch (error) {
            console.error("Error loading saved route data:", error);
        }
    };

    const renderItem = ({ item }) => {
        return (<TouchableOpacity onPress={() => {
            setModalVisible(true);
            setRouteDirection(item.direction);
            setRouteMode(item.mode);
            setRouteId(item.id);
        }}>
            <View style={styles.routeContainer}>
                <Text style={styles.routeName}>{item.origin} to {item.destination}</Text>
            </View>
        </TouchableOpacity>);
    }
    
    const handleRemoveFavorites = async () => {
        try {
            await updateDoc(favRef, {
                [routeId]: deleteField()
            })
            setModalVisible(false);
            retrieveData();
        } catch (error) {
            console.error("Error deleting route data:", error);
        }
    }

    return (      
        <View style={{flex: 6}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Favourite Routes
                </Text>
            </View>
            <FlatList
                data={favoriteRouteList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
            visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.routeName}>{routeMode}</Text>
                        <Text style={styles.modalText}>{routeDirection}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable
                                style={styles.modalButton}
                                onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton]}
                                onPress={() => handleRemoveFavorites()}>
                                <Text style={styles.buttonTextStyle}>Remove from favorites</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        
    )
}
