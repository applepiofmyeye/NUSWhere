import { COLORS, FONT, SIZES } from "../../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    registerContainer:{
        padding: SIZES.xLarge,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.medium,
        alignItems: "center",
        justifyContent:"space-evenly",
    },
    pageTitle: {
        fontFamily: FONT.iSemiB,
        fontSize: SIZES.xxLarge,
        color: COLORS.text,
        paddingBottom: 18
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
      modalSuccessView: {
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
      modalErrorView: {
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor : COLORS.secondary,   
        height: 200 ,  
        width: '80%',  
        borderRadius: 50,  
        borderWidth: 5,  
        borderColor: COLORS.accent,
      }
})

export default styles;