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
        fontSize: SIZES.xxLarge,
        color: COLORS.text,
        paddingBottom: 18
    },
    error: {
        color: "#dc3545"
    }
})

export default styles;