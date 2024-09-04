import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Pet {
    id: string;
    image: any;
}

const petData: Pet[] = [
    {
        id: '1',
        image: require('@/assets/images/rabbitTamagotchi.png'),
    },
    {
        id: '2',
        image: require('@/assets/images/mouseTamagotchi.png'),
    },
    {
        id: '3',
        image: require('@/assets/images/monkeyTamagotchi.png'),
    },
    {
        id: '4',
        image: require('@/assets/images/catTamagochi.png'),
    },
];

const PetListScreen = () => {
    const renderItem = ({ item }: { item: Pet }) => (
        <View style={styles.petContainer}>
            <Image source={item.image} style={styles.petImage} />
        </View>
    );

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

            <TouchableOpacity style={styles.confirmButton}>
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
        justifyContent: 'space-evenly',  // Garante espaçamento uniforme entre os itens
        marginBottom: 30, // Ajustado para espaçamento entre as linhas
    },
    petContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20, // Espaçamento lateral para separar os itens
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
