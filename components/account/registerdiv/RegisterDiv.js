import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator} from "react-native";
import InputBox from "../InputBox/InputBox"
import CustomButton from "../CustomButton/CustomButton";
import styles from "./registerdiv.style";
import { auth } from '../../../app/firebase';

export default function RegisterDiv() {  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [loading, setLoading] = useState(false)
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [passwordRepeatErrorMsg, setPasswordRepeatErrorMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  /* const apiKey = '81aba29089864480a6e5b7bec0c83a45';
  const apiURL = 'https://emailvalidation.abstractapi.com/v1/' + apiKey

  const sendEmailValidationRequest = async (email) => {
    try {
        const response = await fetch.get(apiURL + '&email=' + email);
        const data = response.json();
        return data.is_valid_format.value;
    } catch (error) {
        throw error;
    }
  } */

  /* const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail(text);
      return false;
    }
    else {
      setEmail(text);
      console.log("Email is Correct");
    }
  } */

  const validator = require('validator');

  const handleSignUp = async () => {
        let errorFlag = false;
        setUsernameErrorMsg('');
        setEmailErrorMsg('');
        setPasswordErrorMsg('');
        setPasswordRepeatErrorMsg('');
        setErrorMsg('');
        
        console.log(email);
        // input validation
        if (username.length == 0) {
          errorFlag = true;
          setUsernameErrorMsg("Username is required field");
        }
        if (email.length == 0) {
          errorFlag = true;
          setEmailErrorMsg("Email is required field");
        } else {
          const isValid = validator.isEmail(email); 
          if (!isValid) {
            setEmailErrorMsg("Wrong email format");
          }
        }  

        if (password.length == 0) {
          errorFlag = true;
          setPasswordErrorMsg("Password is required field");
        } else if (password.length < 8 ||  password.length > 20) {
          errorFlag = true;
          setPasswordErrorMsg("Password should be min 8 char and max 20 char");
        } else if (password !==  passwordRepeat) {
          errorFlag = true;
          setErrorMsg("Passwoad and confirm password should be same.");
        }
        
        if (passwordRepeat.length == 0) {
          errorFlag = true;
          setPasswordRepeatErrorMsg("Confirm Password is required field");
        } else if (passwordRepeat.length < 8 ||  passwordRepeat.length > 20) {
          errorFlag = true;
          setPasswordRepeatErrorMsg("Password should be min 8 char and max 20 char");
        }
       
        if (errorFlag) {
            console.log("errorFlag");
        } else {
          setLoading(true);
          await auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registered with:', user.email);
            }).catch(error => {
              setErrorMsg(error.message);
            })
          setLoading(false);
        }
  }

  return (      
    <View style={{flex: 8}}>
      
      <View style={styles.registerContainer}>
          <Text style={styles.pageTitle}>Register</Text>
          <InputBox
            placeholder="Username"
            value={username}
            setValue={setUsername}
            style={styles.input}
            />
          {usernameErrorMsg !== "" && <Text style={styles.error}>{usernameErrorMsg}</Text>}
          <InputBox
            placeholder="Email"
            value={email}
            setValue={setEmail}
            style={styles.input}
          />
          {emailErrorMsg !== "" && <Text style={styles.error}>{emailErrorMsg}</Text>}
          <InputBox
            placeholder="Enter Password"
            value={password}
            setValue={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {passwordErrorMsg !== "" && <Text style={styles.error}>{passwordErrorMsg}</Text>}
          <InputBox
            placeholder="Re-enter Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            style={styles.input}
            secureTextEntry
          />
          {passwordRepeatErrorMsg !== "" && <Text style={styles.error}>{passwordRepeatErrorMsg}</Text>}
      </View>

      <CustomButton text="REGISTER" onPress={handleSignUp} />
      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}
      {loading && <ActivityIndicator />}
    </View>
  );
}