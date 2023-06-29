import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    routeContainer: {
        borderRadius: 18,
        backgroundColor: COLORS.secondary,
        padding: 0,
        borderColor: COLORS.accent,
        borderWidth: 1,
        margin: 5,
        width: 380,
        height: 130,
        justifyContent: "center",
        alignItems: "center"
    },

    routeMode: {
        fontFamily: FONT.iRegular,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },

    title: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xLarge + 1,
        color: COLORS.text,
        margin: 10,
    },

    titleContainer: {
        backgroundColor: COLORS.background

    }
})

export default styles;