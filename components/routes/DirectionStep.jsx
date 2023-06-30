import { View, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons';
import { COLORS } from "../../constants";


export default function DirectionStep({icon, text, isStartOrEnd, dur}) {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={styles.vertLine}></View>
            <Ionicons icon={icon}></Ionicons>
            <Text style={styles.textStyle}>{text}</Text>
            <View style={styles.vertLine}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    vertLine: {
        width: 5,
        height: "100%",
        backgroundColor: COLORS.accent,
    },
    textStyle: {
        backgroundColor: COLORS.background,
        color: COLORS.text,
        paddingLeft: 10
    }

    
})