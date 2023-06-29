/*
Map page where users will key in their go-tos.

TODO:
make this page.
*/

import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS } from "../../constants/theme";
import {
    Welcome,
    RegisterDiv
} from "../../components";


export default function NearestStops() {
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    }}
            />
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}]}>
                <Welcome/>
                <RegisterDiv/>
            </View>

        </SafeAreaView>
    )
}



