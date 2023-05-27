import { COLORS, FONT, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    registerContainer:{
        padding: SIZES.xLarge,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.medium,
        alignItems: "center",
        justifyContent:"space-evenly",
    },
    pageTitle: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.xLarge,
        color: COLORS.text
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    error: {
        color: "#dc3545"
    }
})

export default styles;