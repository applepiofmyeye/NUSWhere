import { COLORS, FONT, SIZES } from "../../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    greetingContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 10,
    },
    greeting: {
        fontFamily: FONT.pMedium,
        fontSize: SIZES.xxLarge,
        color: COLORS.text
    },
    name: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xxLarge,
        color: COLORS.text
    }
})

export default styles;