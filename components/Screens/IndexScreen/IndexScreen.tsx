import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import WButton from "./WButton"
import { useSQLiteContext } from "expo-sqlite"
import { findTamagotchi, initDatabase } from "@/dataBase/db.operations"
import { useState } from "react"

const IndexScreen = () => {
    const [ tamagotchiExist, setTamagotchiExist ] = useState<boolean>(false)
    const db = useSQLiteContext()
    const router = useRouter()

    const verifyTamagotchiExists = async () => {
        try{
            const tamagotchiFound = await findTamagotchi()
            if(tamagotchiFound) {
                setTamagotchiExist(true)
            }
            return console.log("tamagotchi not found")
        }catch(err) {
            throw err
        }
    }

    const authExistUser = async ()  => {
        try {
            await verifyTamagotchiExists()
            await initDatabase()
        }catch(err) {
            console.log(err)
        }
        if(tamagotchiExist){
            console.log("Tamagotchi exists")
            router.push("/petDetailsScreen")
        }  
        console.log("tabela criada")
        router.push("/chooseScreen")
    }

    async function deleteData(){
        try {
            await db.runAsync(`DELETE FROM Tamagotchi`)
            const response = await db.execAsync(`DROP TABLE Tamagotchi`)
            console.log("deubom", response)
        }catch(err) {
            console.log(err)
        }   
    }

    const handleDelete = () => {
        deleteData()
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
            onPress={authExistUser}
            />
            <WButton
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