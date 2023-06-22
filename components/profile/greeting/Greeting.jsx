import React, { View, Text } from "react-native";
import styles from "./greeting.style";

export default function Greeting({mainText, subText}) {
    const nameComponent = <Text style={styles.name}>{subText}</Text>
  return (
    <View style={[styles.greetingContainer, {flex: 2}]}>
        <Text style={styles.greeting}>{mainText}{nameComponent}</Text>
    </View>
  )
}