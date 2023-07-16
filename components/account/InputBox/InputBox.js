import { View, TextInput, StyleSheet } from "react-native";
import React from "react";


const InputBox = ({value, setValue, placeholder, secureTextEntry, ...props}) => {
    return (
            <View style={styles.container}>
                <TextInput
                    {...props}
                    value ={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                />
            </View>    
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 18,

        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
    },
});

export default InputBox;