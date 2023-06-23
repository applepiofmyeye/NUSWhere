/* 
This is the file which is accessed first on running the app. 
The user will be redirected to the login page on opening the app.
*/

import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { AuthStore } from "../store";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  const segments = useSegments();
  const router = useRouter();
  const { initialized, isLoggedIn } = AuthStore.useState();
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === "auth";

    if (
      // If the user is not signed in and the initial segment is not anything
      //  segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      router.replace("/auth/login");
    } else if (isLoggedIn) {
      // go to screen root.
      router.replace("/screens");
    }
  }, [segments, navigationState?.key, initialized]);

  return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;
};
export default Index;