import { COLORS, FONT, SIZES } from "../../../constants";
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
        backgroundColor : "#32CD32",   
        height: 200 ,  
        width: '80%',  
        borderRadius: 50,  
        borderWidth: 10,  
        borderColor: '#fff',   
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: FONT.pBold,
      },
      buttonTextStyle: {
        color: 'white',
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
        backgroundColor : "#EE4B2B",   
        height: 200 ,  
        width: '80%',  
        borderRadius: 50,  
        borderWidth: 10,  
        borderColor: '#fff',
      }
})

export default styles;