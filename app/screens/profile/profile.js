/*
Profile Page. Upon Logging in, this will be the page users are shown.
It contains 2 components, a Greeting and FavouriteRoutesDiv.

TODO:
add backend data -- users' fav routes
add nav bar
*/

import React, { SafeAreaView, View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT } from "../../../constants";
import {
    Greeting,
    FavouriteRoutesDiv
} from "../../../components";
import { auth } from "../../firebase";


export default function Profile() {
    const user = auth.currentUser;
    const name = user.displayName;
    
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background,}}>
            <Stack.Screen
                options={{
                    headerShown: false                       
                    }}
            />
            
            
            <View style={[{flex: 1, backgroundColor: COLORS.background}]}>
                <Greeting mainText="Welcome, " subText={name}/>
                <FavouriteRoutesDiv/>
            </View>

        </View>
    )
}



