import { Redirect } from "expo-router";
import React from "react-native";
import Login from "./login"

export default function Index() {
    return <Redirect href="./login"/>;
}