/*
Directions page
*/

import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants";


export default function Directions() {
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background,}}>
            <Stack.Screen 
                name="screens/directions"
                options={{ headerShown: false, }}/>

            
        </View>
    );
}



