import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    welcomeContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    welcomeTitle: {
    fontFamily: FONT.pBold,
    fontSize: SIZES.title,
    color: COLORS.text
    },

    slogan: {
        fontFamily: FONT.iRegular,
        fontSize: SIZES.large,
        color: COLORS.text
    },

    logo: {
        width:"60%",
        height: "60%",
        alignItems: "center",
        justifyContent: "center"

    }
})

export default styles;


