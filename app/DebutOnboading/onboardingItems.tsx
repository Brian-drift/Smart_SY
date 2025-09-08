import React from 'react';
import {StyleSheet, useWindowDimensions, View, Text} from "react-native";
import LottieView from 'lottie-react-native';

// CORRECTION MAJEURE ICI : Déstructurez 'item' de l'objet des props
const OnboardingItems = ({ item }: { item: any } ) => { // Si TypeScript, { item: any } est une bonne pratique. Sinon, juste ({ item })
    const {width} = useWindowDimensions(); // C'est correct

    return (
        <View style={[styles.container,{width}]}>
            {/* Maintenant, item.image et item.title sont correctement accessibles */}
            <LottieView
                source={item.image} // <-- Passez directement la référence require() du JSON
                autoPlay // L'animation démarre automatiquement
                loop // L'animation se répète en boucle
                style={[styles.lottieAnimation, { width }]} // Appliquez vos styles ici
            />
            <View style={{ flex : 0.3,
                            paddingLeft : 10,}}>
                <Text style={styles.titre}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnimation: {
        flex: 0.7, // Prend la même proportion que votre ancienne image
        justifyContent: 'center',
        alignSelf: 'center', // Centre l'animation horizontalement
        // Vous pouvez ajuster la hauteur si nécessaire, par exemple height: 300,
    },
    titre: {
        fontWeight: '900',
        fontSize: 32,
        color: "#0077ff",
        marginBottom: 15,
        textAlign: "left",
    },
    description: {
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
        color: '#000000',
        paddingHorizontal: 64,
    }
})

export default OnboardingItems;