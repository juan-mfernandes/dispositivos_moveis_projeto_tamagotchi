import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textG}>
                Leandro Gay
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#FFF"
    },
    textG: {
        fontFamily: "Minecraft",
        color: "#000",
        fontSize: 44
    }
})

export default ChooseScreen;