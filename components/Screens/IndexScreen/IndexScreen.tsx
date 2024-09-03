import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import WButton from "./WButton"

const IndexScreen = () => {

    const router = useRouter()
    const nextScreen = ()  => {  
        router.push("/chooseScreen")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Tamagotchi
            </Text>
            <WButton 
            title="Play"
            width={120}
            height={50}
            marginTop={200}
            onPress={nextScreen}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E67C07",
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "#FFFF",
        fontFamily: "Minecraft",
        textShadowColor: "#FFFF",
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 9,
        fontSize: 50,
        marginTop: 100,
        padding: 16,
        backgroundColor: "#E62E07",
        shadowColor: "#000",
        borderRadius: 5,
        elevation: 5,
        textAlign: "center",
    }
})

export default IndexScreen