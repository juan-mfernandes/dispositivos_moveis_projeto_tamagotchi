import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MinigamesScreen = () => {
    const router = useRouter();

    const handleTicTacToe = () => {
        router.push('/gameScreen1');
    };

    const handleFlyerEars = () => {
        router.push('/gameScreen2');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minigames</Text>

            <TouchableOpacity style={styles.gameButton} onPress={handleTicTacToe}>
                <Text style={styles.gameText}>Tic Tac Toe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameButton} onPress={handleFlyerEars}>
                <Text style={styles.gameText}>Flyer Ears</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E67C07',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Minecraft',
        color: '#FFF',
        marginBottom: 40,
    },
    gameButton: {
        width: '80%',
        backgroundColor: '#FF6347',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    gameText: {
        fontSize: 24,
        fontFamily: 'Minecraft',
        color: '#FFF',
        textAlign: 'center',
    },
});

export default MinigamesScreen;
