import React, { View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MapPage from "./map/mappage";
import Profile from "./profile/profile";
import NearestStops from "./nearest-bus-stops/neareststops";
import { COLORS, FONT } from "../../constants";
import { Stack } from "expo-router";

// Screen names
const profileName = 'Profile';
const nearestName = 'NearestStops';
const mapName = 'Map';

const Tab = createBottomTabNavigator();

export default function Index() {
    return (
        <View style={{flex: 1}}>
            <Stack.Screen 
            options={{
                headerShown: false
            }}/>

            <Tab.Navigator
            initialRouteName={profileName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === profileName) {
                        iconName = 'heart';
                    } else if (rn === nearestName) {
                        iconName = 'compass';
                    } else if (rn === mapName) {
                        iconName = 'map';
                    } 

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: COLORS.pressedBtn,
                tabBarInactiveTintColor: COLORS.unpressedBtn,
                tabBarLabelStyle: { fontFamily: FONT.pSemiB, paddingBottom: 5 },
                tabBarStyle: {height: 90, backgroundColor: COLORS.background,},
            })}
            >
 
                <Tab.Screen 
                name={mapName} 
                component={MapPage} 
                />

                <Tab.Screen 
                name={nearestName} 
                component={NearestStops} 
                options={({ route }) => ({
                    tabBarVisible: route.state && route.state.index === 0,
                })}
                />

                <Tab.Screen 
                name={profileName} 
                component={Profile} 
                />

            </Tab.Navigator>

        </View>
    )
}