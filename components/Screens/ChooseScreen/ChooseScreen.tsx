import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

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
    
    const [fontsLoaded] = useFonts({
        'Minecraft': require('@/assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return <View><Text>Loading...</Text></View>; 
    }

    const handleSelectPet = (id: string) => {
        setSelectedPet(id); // Define o pet selecionado
    };

    const handleConfirmSelection = async () => {
        if (selectedPet) {
            await saveSelectedPet(selectedPet); // Salva o ID do pet selecionado
            router.push('/registerScreen');
        } else {
            Alert.alert('Attention', 'Please select a Tamagotchi before confirming.');
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
        fontSize: 35,
        color: '#FFFFFF',
        marginBottom: 40,
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
