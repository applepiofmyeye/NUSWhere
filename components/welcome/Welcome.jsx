import React, { View, Text, Image, /* useWindowDimensions */ } from "react-native";
import Logo from "../../assets/images/NUSWhereLogo.png";
import styles from "./welcome.style";

export default function Welcome() {
  /* const {height} = useWindowDimensions(); */
  return (
<<<<<<< HEAD
    /* {<View style={[styles.welcomeContainer, {flex: 4}]}>
        <Text style={styles.welcomeTitle}>NUSWhere?</Text>
        <Text style={styles.slogan}>here lah</Text>
    </View>} */
    <View style={styles.welcomeContainer}>
      <Image source={Logo} /*styles={[styles.logo, {height: height * 0.3}]}  resizeMode="contain" *//>
      <Text style={styles.slogan}>here lah</Text>
    </View>
=======
    <View style={styles.welcomeContainer}>
    <Image source={Logo} /*styles={[styles.logo, {height: height * 0.3}]}  resizeMode="contain" *//>
    <Text style={styles.welcomeTitle}>NUSWhere?</Text>
    <Text style={styles.slogan}>here lah</Text>
  </View>
>>>>>>> f42e8917fb612e2f44c41a80ba7dab7e86924ee2
  )
}