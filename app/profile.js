import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../constants";
import {
    Greeting,
    FavouriteRoutesDiv
} from "../components";
//import { auth } from "./firebase";


export default function Profile() {
    //const user = auth.currentUser;
    //const displayName = user.displayName;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    //headerTitle: {displayName},
                    headerTitle: "applepiofmyeye",
                    headerStyle: {
                        backgroundColor: COLORS.secondary,
                    },
                    headerTintColor: COLORS.text,
                    
                        
                    }}
            />
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}]}>
                <Greeting/>
                <FavouriteRoutesDiv/>
            </View>

        </SafeAreaView>
    )
}



