import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
    progress: number;
    color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progress * 100}%`, backgroundColor: color }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progress: {
        height: '100%',
    },
});

export default ProgressBar;
