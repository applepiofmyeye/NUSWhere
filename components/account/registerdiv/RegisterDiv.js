import React, { useState } from "react";
import { View, Text, ActivityIndicator, Modal, Pressable } from "react-native";
import InputBox from "../InputBox/InputBox"
import CustomButton from "../CustomButton/CustomButton";
import styles from "./registerdiv.style";
import { auth } from '../../../app/firebase';
import { useRouter } from "expo-router";
import { FirebaseError } from '../Error/FirebaseError';
import { AuthStore } from "../../../store";


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

  const router = useRouter()
  const profile = () => {
    router.replace("../../../screens");
  }

  const validator = require('validator');

  const handleSignUp = async () => {
        setUsernameErrorMsg('');
        setEmailErrorMsg('');
        setPasswordErrorMsg('');
        setPasswordRepeatErrorMsg('');
        setErrorMsg('');
        
        // input validation
        if (username.length == 0) {
          setUsernameErrorMsg("Username is required field");
        }
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
        } else if (password.length < 8 ||  password.length > 20) {
          setPasswordErrorMsg("Password should be min 8 char and max 20 char");
        } else if (password !==  passwordRepeat) {
          setPasswordErrorMsg("Password and confirm password should be same");
        }
        
        if (passwordRepeat.length == 0) {
          setPasswordRepeatErrorMsg("Confirm Password is required field");
        } else if (passwordRepeat.length < 8 ||  passwordRepeat.length > 20) {
          setPasswordRepeatErrorMsg("Password should be min 8 char and max 20 char");
        }
<<<<<<< HEAD
       
        if (errorFlag) {
            //console.log("errorFlag");
        } else {
          setLoading(true);
          await auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registered with:', user.email);
              user.updateProfile({
                displayName: username
              })
              setModalSuccessVisible(true);
            }).catch(error => {
              setModalErrorVisible(true);
              setErrorMsg(FirebaseError(error));
            })
          setLoading(false);
        }
=======
            
        setLoading(true);
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
            user.updateProfile({
              displayName: username
            });
            AuthStore.update((s) => {
              s.isLoggedIn = true;
              s.user = user;
            });
            setModalSuccessVisible(true);
          }).catch(error => {
            setModalErrorVisible(true);
            setErrorMsg(FirebaseError(error));
          })
        setLoading(false);
        
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
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
            testID="Register.username"
            />
          {usernameErrorMsg !== "" && <Text style={styles.error}>{usernameErrorMsg}</Text>}
          <InputBox
            placeholder="Email"
            value={email}
            setValue={setEmail}
            style={styles.input}
            testID="Register.email"
          />
          {emailErrorMsg !== "" && <Text style={styles.error}>{emailErrorMsg}</Text>}
          <InputBox
            placeholder="Enter Password"
            value={password}
            setValue={setPassword}
            style={styles.input}
            secureTextEntry
            testID="Register.password"
          />
          {passwordErrorMsg !== "" && <Text style={styles.error}>{passwordErrorMsg}</Text>}
          <InputBox
            placeholder="Re-enter Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            style={styles.input}
            secureTextEntry
            testID="Register.repeatPassword"
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
              onPress={profile}>
              <Text style={styles.buttonTextStyle}>Go to profile page</Text>
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

<<<<<<< HEAD
      <CustomButton text="REGISTER" onPress={handleSignUp} testID="Register.button"/>
=======
      <CustomButton text="REGISTER" onPress={handleSignUp}/>
      
>>>>>>> 6b3634d025aa81b66efc7ffdddac92a2506181ef
      {loading && <ActivityIndicator />}

    </View>
  );
}