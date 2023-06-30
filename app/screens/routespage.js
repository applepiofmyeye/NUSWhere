import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DirectionStep from "../../components/routes/DirectionStep";
import { COLORS } from "../../constants";

function directionData(mode, directions, distance, duration, outdoorAll) {
    if (mode == "Outdoor"){
        return outdoorAll.routes[0].legs[0].steps.map(
                (step) => ({
                    icon: "walk",
                    text: step.navigationIntruction.instructions, 
                    duration: step.distanceMetres}));

    }
    const busDurationOneStep = 2;
    const shelteredDurOneStep = 3;
    
    return mode == "Bus" 
        ? directions.map(x => ({icon: "bus", text: x, duration: busDurationOneStep})) 
        : directions.map(x => ({icon: "walk", text: x, duration: shelteredDurOneStep}));
}



export default function RoutesPage() {
    const router = useRouter();
    console.log(router);
    const directions = router.query.directions;
    const distance = router.query.distance;
    const duration = router.query.duration;
    const outdoorAll = router.query.all;
    const mode = router.query.mode;
    let dirData = directionData(directions)
    dirData[0].isStartOrEnd = "start";
    dirData[dirData.length - 1] = "end";


    const renderItem = ({item}) => {
        <DirectionStep 
        icon={item.icon} 
        text={item.text} 
        dur={item.duration} 
        isStartOrEnd={item.isStartOrEnd}/>
    }


    return (
        <View style={styles.container}>
            <FlatList
            renderItem={renderItem}
            data={dirData}>
            </FlatList>
            

            
        </View>

    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        padding: 8,
    },
})