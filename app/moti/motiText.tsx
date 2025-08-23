import { MotiText } from 'moti';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const AnimatedLetters = ({ text }) => {
    return (
        <View style={styles.container}>
            {text.split('').map((char, index) => (
                <MotiText
                    key={`${char}-${index}`}
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 500,
                        delay: index * 50, // Délai croissant pour chaque lettre
                    }}
                    style={styles.letter}>
                    {/* On remplace l'espace par un caractère non-sécable pour qu'il prenne de la place */}
                    {char === ' ' ? '\u00A0' : char}
                </MotiText>
            ))}
        </View>
    );
};

export default function AnimatedLetter() {
    return <AnimatedLetters text="BIENVENUE TESTEUR" />;
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row', // Aligner les lettres horizontalement
    },
    letter: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0077ff',
    }
});