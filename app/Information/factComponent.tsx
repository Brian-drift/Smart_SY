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
                setErrorMessage('Désolé, la traduction est momentanément indisponible.');
                return null;
            }
            return translatedText;
        } catch (error) {
            console.error('Erreur lors de la récupération ou de la traduction du fait :', error);
            setErrorMessage('Erreur lors du chargement des faits.');
            return null;
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

    const fetchMoreFacts = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        const numberOfFacts = 5;
        const newFacts = [];
        for (let i = 0; i < numberOfFacts; i++) {
            const fact = await fetchSingleFact();
            if (fact) {
                newFacts.push({ key: fact + Math.random(), text: fact });
            }
        }
        setFacts([...facts, ...newFacts]);
        setLoadingMore(false);
    };

    useEffect(() => {
        fetchMultipleFacts();
    }, []);

    const renderItem = ({ item }) => <Text style={styles.factText}>{item.text}</Text>;

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
                <ActivityIndicator size="large" color="#0000ff" />
            ) : errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : (
                <FlatList
                    data={facts}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    onEndReached={fetchMoreFacts}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    onRefresh={fetchMultipleFacts}
                    refreshing={refreshing}
                    inverted={true}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop : '20%',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        width: '100%',
        marginBottom : 5,
    },
    factText: {
        fontSize: 16,
        fontStyle: 'italic',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorText: {
        color: 'red',
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
});

export default FactListScreen;