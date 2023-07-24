import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import React from "react-native";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "./auth/login",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),

    
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiB: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),

    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemiB: require("../assets/fonts/Inter-SemiBold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="/login">
      <Stack.Screen name="auth/login" />
    </Stack>
  )
};

export default Layout;