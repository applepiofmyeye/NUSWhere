import React, { View, Text, Image } from "react-native";
import Logo from "../../constants/images";
import styles from "./welcome.style";

export default function Welcome() {
  return (
    <View style={styles.welcomeContainer}>
      <Image source={Logo}/>
      <Text style={styles.slogan}>here lah</Text>
    </View>
  )
}