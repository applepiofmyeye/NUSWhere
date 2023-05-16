import { View, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import styles from "./InputBox.style"
import { useState } from "react";


export default function InputBox({className, handle}) {
    const [password, setPassword] = useState('');
    return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.wrapper}>
                    <TextInput
                        name="password"
                        textContentType="password"
                        style={styles.input}
                        value={password}
                        secureTextEntry= {className === "Password"}
                        //secureTextEntry
                        enablesReturnKeyAutomatically
                        onChangeText={text => setPassword(text)}
                        placeholder={className}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                

                </View>
                </TouchableWithoutFeedback>

            </View>
        
    )
}

