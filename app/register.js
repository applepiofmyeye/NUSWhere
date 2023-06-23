/*
Registering page for new users.
Contains 2 components, the Welcome and the RegisterDiv component.
*/

import React, { SafeAreaView, StyleSheet, Platform } from "react-native";
import { Stack } from "expo-router";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import { COLORS } from "../constants";
import {
    Welcome,
    RegisterDiv
} from "../components";


export default function Register() {
    
    return (
        <SafeAreaView style={Platform.OS === 'ios' ? styles.ioscontainer : styles.androidcontainer}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    }}
            />
            
            <KeyboardAwareScrollView style={[{flex: 1, backgroundColor: COLORS.background}]}>
                <Welcome/>
                <RegisterDiv/>
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



