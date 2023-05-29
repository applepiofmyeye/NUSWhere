import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    welcomeContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 1
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
        width: '70%',
        maxHeight: 200,
        maxWidth: 220,
        resizeMode: 'contain', 
    }
})

export default styles;


