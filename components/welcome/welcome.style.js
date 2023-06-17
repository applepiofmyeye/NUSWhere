import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    welcomeContainer: {
        paddingBottom: 1,
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
<<<<<<< HEAD
        resizeMode: 'contain', 
=======
        resizeMode: 'contain',
        paddingVertical: 20
>>>>>>> f42e8917fb612e2f44c41a80ba7dab7e86924ee2
    }
})

export default styles;


