/*
Profile Page. Upon Logging in, this will be the page users are shown.
It contains 2 components, a Greeting and FavouriteRoutesDiv.

TODO:
add backend data -- users' fav routes
add nav bar
*/

import React, { TouchableOpacity, View, Text, Alert, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants/theme";
import {
    Greeting,
    FavouriteRoutesDiv
} from "../../components";
import { auth } from "../firebase";
import { AuthStore } from "../../store";
import { signOut } from "firebase/auth/react-native";

export default function Profile() {
    //const user = auth.currentUser;
    //const name = user.displayName;

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
        <View style={{ flex: 1, backgroundColor: COLORS.background,}}>
            <Stack.Screen
                options={{
                    headerShown: false                       
                    }}
            />
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}]}>

                <TouchableOpacity 
                    onPress={async () => {
                        const resp = await appSignOut();
                        if (!resp?.error) {
                        router.replace("../auth/login");
                        } else {
                        console.log(resp.error);
                        Alert.alert("Logout Error", resp.error?.message);
                        }}} 
                    style={{ paddingTop: 35, alignItems: "flex-end", marginRight: 10 }}>
                    <Text>Logout</Text>
                </TouchableOpacity>

                <Greeting mainText="Welcome, " subText={AuthStore.getRawState().user?.displayName}/>
                <FavouriteRoutesDiv/>

            </View>
        </View>
    )
}

//problem with FRList, cannot render.

