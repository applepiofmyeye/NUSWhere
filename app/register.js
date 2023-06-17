import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS } from "../constants";
import {
    Welcome,
    RegisterDiv
} from "../components";


export default function Register() {
    
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



