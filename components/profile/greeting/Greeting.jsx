import React, { View, Text } from "react-native";
import { auth } from "../../../app/firebase"
import styles from "./greeting.style";

export default function Greeting() {
    const user = auth.currentUser;
    const name = user.displayName;

    //const name = "joey"
    const nameComponent = <Text style={styles.name}>{name}</Text>
  return (
    <View style={[styles.greetingContainer, {flex: 2}]}>
        <Text style={styles.greeting}>Welcome, {nameComponent}</Text>
    </View>
  )
}