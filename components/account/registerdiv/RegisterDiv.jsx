import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView
} from "react-native";
import { FONT } from "../../../constants";

import InputBox from "../textinput/InputBox"
import styles from "./registerdiv.style";


export default function RegisterDiv() {  
  const router = useRouter();
  const onPress = () => Alert.alert("pressed!");
  const [match, setMatch] = useState(false); // whether password entered matches

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const handleEmail = (email) => { setEmail(email) }
  const handlePassword = (password) => { setPassword(password) }
  const handleName = (name) => { setName(password) }


  return (      
    <View style={{flex: 8}}>
      <View style={styles.registerContainer}>
          <Text style={styles.pageTitle}>Register</Text>
          <InputBox className="Name" />
          <InputBox className="Username" />
          <InputBox className="Password" />

      </View>
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity style={styles.registerBtn(match)} onPress={onPress}>
          <Text style={styles.registerBtnLabel}>REGISTER</Text>
        </TouchableOpacity>
        
      </View>
    </View>

  );
}