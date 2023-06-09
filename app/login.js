/*
Login page. It contains mainly 2 components: LoginDiv and Welcome.
*/


import React, { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS } from "../constants";
import {
    Welcome,
    LoginDiv
} from "../components";


export default function Login() {
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} behavior="padding">
            <Stack.Screen
                options={{
                headerShown: false
                }}
            />
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}, {flexDirection: 'column'}]}>
                <Welcome />
                <LoginDiv />
            </View>

        </SafeAreaView>
    )
}