import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const FactComponent = () => {
    // On utilise useState pour stocker le fait et l'état de chargement
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);

    // On utilise useEffect pour appeler l'API une seule fois au démarrage
    useEffect(() => {
        const fetchFactAndTranslate = async () => {
            try {
                // Étape 1 : On récupère le fait en anglais de la première API
                const factResponse = await fetch('https://f-api.ir/api/facts/random');
                const factData = await factResponse.json();

                // On récupère la phrase du fait pour l'étape 2
                const factToTranslate = factData.fact;

                // Étape 2 : On construit l'URL pour l'API de traduction
                const translationUrl = `https://api.mymemory.translated.net/get?q=${factToTranslate}&langpair=en|fr`;

                // Étape 3 : On fait la requête à l'API de traduction
                const translationResponse = await fetch(translationUrl);
                const translationData = await translationResponse.json();

                // Étape 4 : On met à jour l'état avec le fait traduit,
                // en utilisant le bon chemin d'accès à l'information !
                setFact(translationData.responseData.translatedText);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération ou de la traduction du fait :', error);
                setLoading(false);
            }
        };

        fetchFactAndTranslate();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Text style={styles.factText}>{fact}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    factText: {
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default FactComponent;