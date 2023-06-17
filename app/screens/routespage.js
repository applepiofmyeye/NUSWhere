/*
Directions page
*/

import React, { SafeAreaView, View, ScrollView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants";
import { GOOGLE_API } from "../../keys";


export default function RoutesPage() {
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background,}}>
            <Stack.Screen 
                options={{ headerShown: false, }}/>
                <Text>Routes</Text>
        </View>
    );
}



