import React, { View, Text, Image } from "react-native";
import { logo } from "../../constants";

import styles from "./welcome.style";

export default function Welcome() {
  return (
    <View style={[styles.welcomeContainer, {flex: 4}]}>
        <Text style={styles.welcomeTitle}>NUSWhere?</Text>
        <Text style={styles.slogan}>here lah</Text>
    </View>
  )
}