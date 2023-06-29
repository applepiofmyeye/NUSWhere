/*
Login page. It contains mainly 2 components: LoginDiv and Welcome.
*/


import React, { Platform, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import { COLORS } from "../../constants/theme";
import {
    Welcome,
    LoginDiv
} from "../../components";


export default function Login() {
    
    return (
        <SafeAreaView style={Platform.OS === 'ios' ? styles.ioscontainer : styles.androidcontainer}>
            <Stack.Screen
                options={{
                headerShown: false
                }}
            />            
            <KeyboardAwareScrollView style={[{ flex: 1, backgroundColor: COLORS.background}, {flexDirection: 'column'}]}>
                <Welcome />
                <LoginDiv />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ioscontainer : {
        flex: 1, 
        backgroundColor: COLORS.background,
    },
    androidcontainer :{
        flex: 1, 
        backgroundColor: COLORS.background,
        paddingTop: 50,
    }
});