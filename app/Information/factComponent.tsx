import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';

const FactListScreen = () => {
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // <== NOUVEAU !

    const fetchSingleFact = async () => {
        try {
            const factResponse = await fetch('https://f-api.ir/api/facts/random');
            const factData = await factResponse.json();
            const factToTranslate = factData.fact;
            const translationUrl = `https://api.mymemory.translated.net/get?q=${factToTranslate}&langpair=en|fr`;
            const translationResponse = await fetch(translationUrl);
            const translationData = await translationResponse.json();

            const translatedText = translationData.responseData.translatedText;
            if (translatedText.includes('WARNING')) {
                return setErrorMessage("Traduction des faits momentanemt indisponible.");
            }
            return translatedText;
        } catch (error) {
            return setErrorMessage("Vous êtez hors lignes");
        }
    };

    const fetchMultipleFacts = async () => {
        setLoading(true);
        setFacts([]);
        setErrorMessage(null); // On efface les messages d'erreur précédents

        const numberOfFacts = 5;
        const newFacts = [];
        for (let i = 0; i < numberOfFacts; i++) {
            const fact = await fetchSingleFact();
            if (fact) {
                newFacts.push({ key: fact + Math.random(), text: fact });
            }
        }
        setFacts(newFacts);
        setLoading(false);
        setRefreshing(false); // <== NOUVEAU !
    };


    const renderItem = ({ item }) => <Text style={styles.factText}>{item.text}</Text>
     ;

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Recherche des données...</Text>
                    </View>
            ) : errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : (
                    <FlatList
                        data={facts.slice(0, 6)}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                        showsHorizontalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        onRefresh={fetchMultipleFacts}
                        refreshing={refreshing}
                    />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop : '20%',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        width: '100%',
        marginBottom : 5,
    },
    containerFact: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius : 10,
        width: '100%',
        marginBottom : 5,
        borderWidth: 1,
        borderColor: '#fd0000',
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Error: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius : 10,
        width: '100%',
        marginBottom : 5,
        borderWidth: 1,
        borderColor: '#fd0000',
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    factText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginHorizontal : 10,
        margin : 25,
        borderBottomWidth : 1,
        borderColor: '#fff',
    },
    errorText: {
        color: '#FD7F00FF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    footerContainer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FactListScreen;