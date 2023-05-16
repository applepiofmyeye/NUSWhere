import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";
import { FONT } from "../../../constants";

import InputBox from "../textinput/InputBox"
import styles from "./logindiv.style";


export default function LoginDiv() {  
  const router = useRouter()
  const onPress = () => Alert.alert("pressed!")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmail = (email) => { setEmail(email) }
  const handlePassword = (password) => { setPassword(password) }
  // const handleAccount = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  return (      
    <View style={{flex: 8}}>
      <View style={styles.loginContainer}>
          <Text style={styles.pageTitle}>Login</Text>
          <InputBox className="Username" />
          <InputBox className="Password" />
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
          <Text style={styles.loginBtnLabel}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{padding: 20,}}>
          <TouchableOpacity style={{flexDirection: "row", }} onPress={() => router.push(href="./register")}>
            <Text>New to NUSWhere? </Text>
            <Text style={{fontFamily: FONT.iSemiB}}>Register</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>

  )
}