import React, { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS } from "../constants";
import {
    Welcome,
    LoginDiv
} from "../components";


export default function Login() {
    
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.background }} behavior="padding">
            <Stack.Screen
                options={{
                headerStyle: { backgroundColor: COLORS.background },
                headerShadowVisible: false,
                headerTitle: "",
                }}
            />
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}, {flexDirection: 'column'}]}>
                <Welcome />
                <LoginDiv />
            </View>

        </KeyboardAvoidingView>
    )
}



//     welcomeTitle: {
//         fontFamily: FONT.pBold,
//         fontSize: SIZES.title,
//         color: COLORS.text
//     },

//     slogan: {
//         fontFamily: FONT.iRegular,
//         fontSize: SIZES.large,
//         color: COLORS.text
//     },

//     pageTitle: {
//         fontFamily: FONT.iSemiB,
//         fontSize:SIZES.xLarge,
//         color: COLORS.text
//     },

//     welcomeContainer: {
//         alignItems: "center",
//         justifyContent: "flex-end"
//     },

//     loginContainer: {
//         alignItems: "center",
//         marginTop: 40
//     }

// })