import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagotchi } from '@/models/Tamagotchi';

const rabbitImage: string = require('@/assets/images/rabbitTamagotchi.png')
const mouseImage = require('@/assets/images/mouseTamagotchi.png')
const monkeyImage = require('@/assets/images/monkeyTamagotchi.png')
const catImage = require('@/assets/images/catTamagochi.png')

const tamagotchiData = [
    { id: 1, image: rabbitImage },
    { id: 2, image: mouseImage },
    { id: 3, image: monkeyImage },
    { id: 4, image: catImage },
]

const saveSelectedPet = async (id: number) => {
    const idToString = id.toString()
    try {
        await AsyncStorage.setItem('@selectedPet', idToString);
        console.log(id)
    } catch (error) {
        console.log("Erro ao salvar o pet:", error);
    }
};

const PetListScreen = () => {
    const [selectedPet, setSelectedPet] = useState<number | null>(null);
    const router = useRouter();

    const handleSelectPet = (id: number) => {
        setSelectedPet(id);
    }

    const handleConfirmSelection = async () => {
        if (selectedPet) {
            await saveSelectedPet(selectedPet);
            router.push('/registerScreen');
        } else {
            alert('Please select a Tamagotchi');
        }
    }

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedPet === item.id;
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
        fontFamily: 'Minecraft',
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 70,
        textAlign: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#E62E07',
        borderRadius: 5,
        elevation: 5,
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        justifyContent: 'space-evenly',
        marginBottom: 30,
    },
    petContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    selectedPet: {
        borderColor: '#FFD700',
        borderWidth: 3,
        borderRadius: 5,
    },
    petImage: {
        width: 140,
        height: 180,
        resizeMode: 'contain',
    },
    confirmButton: {
        backgroundColor: '#E62E07',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '85%',
        marginBottom: 30,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Minecraft',
        fontSize: 24,
    },
});

export default PetListScreen;
