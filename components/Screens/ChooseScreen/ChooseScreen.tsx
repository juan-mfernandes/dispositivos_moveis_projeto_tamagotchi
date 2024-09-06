import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Pet {
    id: string;
    image: any;
}

const petData: Pet[] = [
    { id: '1', image: require('@/assets/images/rabbitTamagotchi.png') },
    { id: '2', image: require('@/assets/images/mouseTamagotchi.png') },
    { id: '3', image: require('@/assets/images/monkeyTamagotchi.png') },
    { id: '4', image: require('@/assets/images/catTamagochi.png') },
];

// Função para salvar o ID do Tamagotchi selecionado
const saveSelectedPet = async (id: string) => {
    try {
        await AsyncStorage.setItem('@selectedPet', id);
    } catch (error) {
        console.log("Erro ao salvar o pet:", error);
    }
};

const PetListScreen = () => {
    const [selectedPet, setSelectedPet] = useState<string | null>(null);
    const router = useRouter();

    const handleSelectPet = (id: string) => {
        setSelectedPet(id);
    };

    const handleConfirmSelection = async () => {
        if (selectedPet) {
            await saveSelectedPet(selectedPet); // Salva o ID do pet selecionado
            router.push('/registerScreen');
        } else {
            alert('Please select a Tamagotchi');
        }
    };

    const renderItem = ({ item }: { item: Pet }) => {
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
                data={petData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
