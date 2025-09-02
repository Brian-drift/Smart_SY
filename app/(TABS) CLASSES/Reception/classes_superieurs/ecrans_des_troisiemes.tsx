import React from 'react';
import {View, StyleSheet, Text, FlatList} from "react-native";

function EcransDesTroisiemes(props:any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Troisième</Text>
            {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
            {/* -- lorsque fred aura fini le backEnd c'est ici que les différents syllabus pourons s'afficher -- */}
            {/* -- vous aurait remarqué que la conception de cette flatlist est similaire à celui des professeures -- */}
            {/* -- c'est tout à fait volontaire de m'a part, car l'écrans des classes éditeurs sont s'afficherons comme les écrans des classes recéptionistes -- */}
            {/*---------------------------------------------------------------------------------------------------------------------------------------------*/}
            {/*<FlatList
                numColumns={2}
                data={syllabusList}
                renderItem={}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
            />*/}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 20,
    },
    flatListContent: {
        padding: 0,
        width: '100%',
    },
})
export default EcransDesTroisiemes;