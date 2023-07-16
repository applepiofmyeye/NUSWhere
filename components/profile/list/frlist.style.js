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

    title: {
        fontFamily: FONT.pSemiB,
        fontSize: SIZES.xLarge + 1,
        color: COLORS.text,
        margin: 10,
    },

    titleContainer: {
        backgroundColor: COLORS.background

    },
    buttonTextStyle: {
        color: COLORS.pressedBtn,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: FONT.pMedium,
        fontSize: SIZES.large,
        color: COLORS.text,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 250ms ease',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor : COLORS.secondary,   
        height: 200 ,  
        width: '80%',  
        borderRadius: 50,  
        borderWidth: 5,  
        borderColor: COLORS.accent,   
    },
})

export default styles;