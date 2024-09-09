import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const BallGame = () => {
    const [positionX, setPositionX] = useState(new Animated.Value(0));
    const [positionY, setPositionY] = useState(new Animated.Value(0));
    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        // Inscrevendo-se no sensor giroscópio
        const subscription = Gyroscope.addListener((data) => {
            setGyroscopeData(data);
        });

        Gyroscope.setUpdateInterval(100); // Frequência de atualização

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        // Atualiza a posição da bolinha de acordo com os dados do giroscópio
        Animated.timing(positionX, {
            toValue: gyroscopeData.x * -100,
            duration: 100,
            useNativeDriver: false,
        }).start();

        Animated.timing(positionY, {
            toValue: gyroscopeData.y * 100,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [gyroscopeData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Controle a Bolinha!</Text>
            <View style={styles.playground}>
                <Animated.View
                    style={[
                        styles.ball,
                        { transform: [{ translateX: positionX }, { translateY: positionY }] },
                    ]}
                />
            </View>
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
        marginBottom: 20,
    },
    playground: {
        width: 300,
        height: 300,
        backgroundColor: '#FFF',
        borderRadius: 150,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ball: {
        width: 50,
        height: 50,
        backgroundColor: '#FF6347',
        borderRadius: 25,
    },
});

export default BallGame;
