import { COLORS, FONT, SIZES } from "../../../constants/theme";
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