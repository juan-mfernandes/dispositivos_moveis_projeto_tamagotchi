import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import IndexButton from "../../utils/indexButton"
import { dbOperations } from "@/dataBase/db.operations"
import { useEffect, useState } from "react"

const IndexScreen = () => {
    const [ tamagotchiExist, setTamagotchiExist ] = useState<boolean>(false)
    const router = useRouter()
    const db = dbOperations()

    const verifyTamagotchiExists = async () => {
        try{
            const tamagotchiFound = await db.loadDatabaseTamagotchi()
            if(tamagotchiFound) {
               setTamagotchiExist(true)
            }
        }catch(err) {
            throw err
        }
    }

    const handleDelete = () => {
        db.deleteTamagotchiFromDatabase()    
    }

    const authExistUser = ()  => {
        if(tamagotchiExist){
            console.log("Tamagotchi exists")
            return router.replace("/petDetailsScreen")
        }  
        console.log("authenticated")
        router.push("/chooseScreen")
    }

    useEffect(() => {
        verifyTamagotchiExists()
    },[] )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Tamagotchi
            </Text>
            <IndexButton 
            title="Play"
            width={120}
            height={50}
            marginTop={200}
            onPress={authExistUser}
            />
            <IndexButton
            fontSize={30}
            title="Delete"
            width={150}
            height={50}
            marginTop={100}
            onPress={handleDelete}
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