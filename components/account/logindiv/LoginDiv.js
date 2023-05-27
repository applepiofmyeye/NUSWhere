import React, { useState } from "react";
import { View, Text, Alert} from "react-native";
import InputBox from "../InputBox/InputBox";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "expo-router";
import { FONT } from "../../../constants";
import styles from "./logindiv.style";
import { auth } from '../../../app/firebase';


export default function LoginDiv() {  
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => Alert.alert(error.message))
  }
  const register = () => {
    router.push("./register");
  }

  return (      
    <View style={{flex: 8}}>
      
      <View style={styles.loginContainer}>
          <Text style={styles.pageTitle}>Login</Text>
          <InputBox
            placeholder="Email"
            value={email}
            setValue={setEmail}
            style={styles.input}
          />
          <InputBox
            placeholder="Password"
            value={password}
            setValue={setPassword}
            style={styles.input}
            secureTextEntry
          />
      </View>

      <CustomButton text="LOGIN" onPress={handleLogin} />

      <View style={styles.registerContainer}>
          <Text>New to NUSWhere? </Text>
          <Text onPress={register} style={{fontFamily: FONT.iSemiB}}>Register</Text>
      </View>

    </View>
  )
}