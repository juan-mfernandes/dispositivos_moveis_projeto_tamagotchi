import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, FlatList, View, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const rabbitImage: string = require('@/assets/images/staticImgs/rabbitTamagotchi.png')
const mouseImage = require('@/assets/images/staticImgs/mouseTamagotchi.png')
const monkeyImage = require('@/assets/images/staticImgs/monkeyTamagotchi.png')
const catImage = require('@/assets/images/staticImgs/catTamagochi.png')

const tamagotchiData = [
    { id: 1, image: rabbitImage },
    { id: 2, image: mouseImage },
    { id: 3, image: monkeyImage },
    { id: 4, image: catImage },
]

const saveSelectedPet = async (id: number) => {
    const idToString = id.toString()
    try {
        await AsyncStorage.setItem('@selectedPet', idToString)
        console.log(id)
    } catch (error) {
        console.log("save pet error:", error)
    }
};

const PetListScreen = () => {
    const [selectedPet, setSelectedPet] = useState<number | null>(null);
    const router = useRouter();
    
    const [fontsLoaded] = useFonts({
        'Minecraft': require('@/assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return <View><Text>Loading...</Text></View>; 
    }

    const handleSelectPet = (id: number) => {
        setSelectedPet(id); 
    };

    const handleConfirmSelection = async () => {
        if (selectedPet) {
            await saveSelectedPet(selectedPet)
            router.push('/registerScreen')
        } else {
            Alert.alert('Attention', 'Please select a Tamagotchi before confirming.');
        }
    }

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedPet === item.id
        return (
            <TouchableOpacity
                onPress={() => handleSelectPet(item.id)}
                style={[
                    styles.petContainer,
                    isSelected ? styles.selectedPet : null,
                ]}
            >
                <Image source={item.image} style={styles.petImage} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Choose your Tamagotchi</Text>

            <FlatList
                data={tamagotchiData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
                <Text style={styles.confirmButtonText}>Confirm selection</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E67C07',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        borderWidth: 2,
        borderColor: "#000",
        paddingVertical: 8,
        fontFamily: 'Minecraft',
        fontSize: 35,
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#E62E07',
        borderRadius: 8,
        elevation: 6,
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    petContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#E67C07',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 5,
    },
    selectedPet: {
       backgroundColor:'#9A5100',
    },
    petImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    confirmButton: {
        backgroundColor: '#E62E07',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        width: '85%',
        borderWidth: 2,
        borderColor: "#000",
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Minecraft',
        fontSize: 24,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default PetListScreen;
