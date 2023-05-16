import { COLORS, FONT, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loginContainer:{
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
    loginBtn: {
        width: 250,
        backgroundColor: COLORS.pressedBtn,
        padding: 15,
        borderRadius: SIZES.xLarge,
        alignItems: "center",

    },
    loginBtnLabel: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.large,
        color: COLORS.text
    },
    loginBtnContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
    }
})

export default styles;