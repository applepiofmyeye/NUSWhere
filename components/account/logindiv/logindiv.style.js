import { COLORS, FONT, SIZES } from "../../../constants/theme";
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
    },
    error: {
        color: "#dc3545"
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
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: FONT.pMedium,
        fontSize: SIZES.large,
        color: COLORS.text,
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
})

export default styles;