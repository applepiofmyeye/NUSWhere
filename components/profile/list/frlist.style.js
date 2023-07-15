import { COLORS, FONT, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    routeContainer: {
        borderRadius: 18,
        backgroundColor: COLORS.secondary,
        padding: 18,
        borderColor: COLORS.accent,
        borderWidth: 1,
        margin: 10,
    },

    routeName: {
        fontFamily: FONT.iRegular,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },

    modeName: {
        fontFamily: FONT.iLight,
        fontSize: SIZES.medium,
        color: COLORS.text,
        textAlign: "left",
        paddingLeft: 10
    },

    title: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xLarge + 1,
        color: COLORS.text,
        marginLeft: 10,
    },

    titleContainer: {
        backgroundColor: COLORS.background

    }
})

export default styles;