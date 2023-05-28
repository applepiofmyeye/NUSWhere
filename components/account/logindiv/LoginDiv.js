import React, { useState } from "react";
import { View, Text, Modal, Pressable} from "react-native";
import InputBox from "../InputBox/InputBox";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "expo-router";
import { FONT } from "../../../constants";
import styles from "./logindiv.style";
import { auth } from '../../../app/firebase';
import { FirebaseError } from '../Error/FirebaseError';


export default function LoginDiv() {  
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [modalVisible, setModalVisible] = useState(false)


  const handleLogin = () => {
    setEmailErrorMsg('');
    setPasswordErrorMsg('');

    const validator = require('validator');

    if (email.length == 0) {
      setEmailErrorMsg("Email is required field");
    } else {
      const isValid = validator.isEmail(email); 
      if (!isValid) {
        setEmailErrorMsg("Wrong email format");
      }
    } 
    
    if (password.length == 0) {
      setPasswordErrorMsg("Password is required field");
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        router.push("./home");
      })
      .catch(error => {
        setModalVisible(true);
        setErrorMsg(FirebaseError(error));
      })

      setEmail('');
      setPassword('');
  }

  const register = () => {
    router.push("./register");
    setEmail('');
    setPassword('');
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
          {emailErrorMsg !== "" && <Text style={styles.error}>{emailErrorMsg}</Text>}
          <InputBox
            placeholder="Password"
            value={password}
            setValue={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {passwordErrorMsg !== "" && <Text style={styles.error}>{passwordErrorMsg}</Text>}
      </View>

      <CustomButton text="LOGIN" onPress={handleLogin} />

      <Modal
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {errorMsg !== "" && <Text style={styles.modalText}>{errorMsg}</Text>}
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonTextStyle}>Go back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.registerContainer}>
          <Text>New to NUSWhere? </Text>
          <Text onPress={register} style={{fontFamily: FONT.iSemiB}}>Register</Text>
      </View>
    </View>
  )
}