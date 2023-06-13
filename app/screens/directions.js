/*
Directions page
*/

import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants";
import {
    Greeting,
    FavouriteRoutesDiv
} from "../../components";
import { auth } from "../firebase";


export default function Directions() {
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background,}}>
            
        </View>
    )
}



