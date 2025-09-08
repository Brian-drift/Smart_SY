import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import SyllabusCard from "@/app/composants/syllabus_card";

export default function EcransDesPremieres() {
    const [dogs, setDogs] = useState<string[]>([]); // tableau d'images
    const [refreshing, setRefreshing] = useState(false);

    const fetchDogs = async () => {
        try {
            setRefreshing(true);
            // API qui renvoie plusieurs images aléatoires
            const res = await fetch("https://dog.ceo/api/breeds/image/random/2000");
            const json = await res.json();
            setDogs(json.message); // message est un tableau d’URLs
        } catch (error) {
            console.error("Erreur API:", error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDogs();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={dogs}
                renderItem={({ item, index }) => (
                    <SyllabusCard id={index.toString()} imageUrl={item} />
                )}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ padding: 10 }}
                refreshing={refreshing}
                onRefresh={fetchDogs}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
});
