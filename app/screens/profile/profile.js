/*
Profile Page. Upon Logging in, this will be the page users are shown.
It contains 2 components, a Greeting and FavouriteRoutesDiv.
*/

import React, { TouchableOpacity, Text, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import {
    Greeting,
    FavouriteRoutesDiv
} from "../../../components";
import { auth } from "../../firebase";
import { AuthStore } from "../../../store";
import { signOut } from "firebase/auth/react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const router = useRouter();
    const appSignOut = async () => {
        try {
          await signOut(auth);
          AuthStore.update((store) => {
            store.user = null;
            store.isLoggedIn = false;
          });
          return { user: null };
        } catch (e) {
          return { error: e };
        }
      };
    
    return (        
        <SafeAreaView style={[{flex: 8, backgroundColor: COLORS.background}]}>
            <Stack.Screen
                options={{
                    headerShown: false                       
                    }}
            />
                <TouchableOpacity 
                    onPress={async () => {
                        const resp = await appSignOut();
                        if (!resp?.error) {
                          router.replace("../../auth/login");
                        } else {
                          console.log(resp.error);
                          Alert.alert("Logout Error", resp.error?.message);
                        }}} 
                    style={{ paddingTop: 10, alignItems: "flex-end", marginRight: 10 }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                
                <Greeting mainText="Welcome, " subText={AuthStore.getRawState().user?.displayName}/>
                <FavouriteRoutesDiv/>

        </SafeAreaView>        
    )
}


