import React, { useState } from "react";
import { View, Text, ActivityIndicator, Modal, Pressable, /* RefreshControl, ScrollView */} from "react-native";
import InputBox from "../InputBox/InputBox"
import CustomButton from "../CustomButton/CustomButton";
import styles from "./registerdiv.style";
import { auth } from '../../../app/firebase';
import { useRouter } from "expo-router";
import { FirebaseError } from '../Error/FirebaseError';


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
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false)
  const [modalErrorVisible, setModalErrorVisible] = useState(false)
  /* const [refreshing, setRefreshing] = React.useState(false) */

  const router = useRouter()
  const login = () => {
    router.push("./login");
  }

  /* const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []); */

  const validator = require('validator');

  const handleSignUp = async () => {
        let errorFlag = false;
        setUsernameErrorMsg('');
        setEmailErrorMsg('');
        setPasswordErrorMsg('');
        setPasswordRepeatErrorMsg('');
        setErrorMsg('');
        
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
          setErrorMsg("Password and confirm password should be same");
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
              user.updateProfile({
                displayName: {username}
              })
              console.log('Registered with:', user.email);
              setModalSuccessVisible(true);
            }).catch(error => {
              setModalErrorVisible(true);
              setErrorMsg(FirebaseError(error));
            })
          setLoading(false);

        }

  }

  return (    
    /* {<ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />  }> } */
    <View style={{flex: 8}}>
      
      <View style={styles.registerContainer}>
          <Text style={styles.pageTitle}>Register</Text>
          <InputBox
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />
          {usernameErrorMsg !== "" && <Text style={styles.error}>{usernameErrorMsg}</Text>}
          <InputBox
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
          {emailErrorMsg !== "" && <Text style={styles.error}>{emailErrorMsg}</Text>}
          <InputBox
            placeholder="Enter Password"
            value={password}
            setValue={setPassword}
            secureTextEntry
          />
          {passwordErrorMsg !== "" && <Text style={styles.error}>{passwordErrorMsg}</Text>}
          <InputBox
            placeholder="Re-enter Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry
          />
          {passwordRepeatErrorMsg !== "" && <Text style={styles.error}>{passwordRepeatErrorMsg}</Text>}
      </View>

      <Modal
        transparent={true}
        visible={modalSuccessVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalSuccessView}>
            <Text style={styles.modalText}>You have successfully registered an account with us!</Text>
            <Pressable
              style={styles.modalButton}
              onPress={login}>
              <Text style={styles.buttonTextStyle}>Return to login page</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalErrorVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalErrorView}>
          {errorMsg !== "" && <Text style={styles.modalText}>{errorMsg}</Text>}
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalErrorVisible(!modalErrorVisible)}>
              <Text style={styles.buttonTextStyle}>Go back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CustomButton text="REGISTER" onPress={handleSignUp} />
      {loading && <ActivityIndicator />}
    </View>
    /* </ScrollView> */
  );
}