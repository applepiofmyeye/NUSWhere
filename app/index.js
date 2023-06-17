/* 
This is the file which is accessed first on running the app. 
The user will be redirected to the login page on opening the app.
*/


import { Redirect } from "expo-router";
import React from "react-native";

export default function Index() {
    return <Redirect href="./login"/>;
}