import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from './ProgressBar';

const PetDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hello, Tamagotchi Name</Text>

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Hunger</Text>
                <ProgressBar progress={0.5} color="#ff0000" />
                
                <Text style={styles.statsText}>Sleep</Text>
                <ProgressBar progress={0.1} color="#0000FF" />
                
                <Text style={styles.statsText}>Fun</Text>
                <ProgressBar progress={0.9} color="#00ff00" />
                
                <Text style={styles.statsText}>Status: GOOD</Text>
            </View>

            <Image source={require('@/assets/images/mouseTamagotchi.gif')} style={styles.petImage} />

            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.actionButton}>
                    <Image source={require('@/assets/images/sleepButton.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Image source={require('@/assets/images/toPlayButton.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Image source={require('@/assets/images/toFeedButton.png')} style={styles.actionIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E67C07',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontFamily: 'Minecraft',
        fontSize: 24,
        color: '#FFFFFF',
        marginVertical: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#E62E07',
        borderRadius: 5,
        elevation: 5,
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    statsContainer: {
        width: '90%',
        backgroundColor: '#E62E07',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        elevation: 5,
    },
    statsText: {
        color: '#FFFFFF',
        fontFamily: 'Minecraft',
        fontSize: 18,
        marginBottom: 5,
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    petImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#B91D1D',
        width: '100%',
        padding: 16,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        elevation: 5,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});

export default PetDetailScreen;
