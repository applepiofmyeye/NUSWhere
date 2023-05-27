import { COLORS, FONT, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loginContainer: {
        padding: SIZES.xLarge,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.medium,
        alignItems: "center",
        justifyContent:"space-evenly"
    },
    pageTitle: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.xLarge,
        color: COLORS.text
    },
    registerContainer: {
        padding: 20, 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "row"
    }
})

export default styles;