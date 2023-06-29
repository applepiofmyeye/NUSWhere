import React from 'react'
import { Text, StyleSheet, Pressable, View } from 'react-native'
import { COLORS, FONT, SIZES } from "../../../constants/theme";

const CustomButton = ({onPress, text, ...props}) => {
    return (
    <View style={{alignItems: "center", justifyContent: "flex-end"}}>
        <Pressable {...props} onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.pressedBtn,

        width: 250,
        padding: 15,
        marginVertical : 5,

        alignItems: "center",
        borderRadius: SIZES.xLarge,
        justifyContent: "center",
    },
    text: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.large,
        color: COLORS.text
    },
})

export default CustomButton;
