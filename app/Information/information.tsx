import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from "react-native";

const Information = ({ item }: { item: any }  )=> {

    return (
        <TouchableOpacity style={[styles.container]}
        // la connection avec l'ecran de conversation IA
        >
            <Text style={styles.titre}>{item.titre}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding : 22,
        borderRadius : 10,
        margin : 20,
        // ombre IOS
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius : 3,
        // pour android
        elevation: 4,
    },
    titre: {
        fontWeight: '900',
        fontSize: 14,
        color: "#0077ff",
        marginBottom: 15,
        textAlign: "left",
    },
    description: {
        fontSize: 18,
        fontWeight: 300,
        textAlign: 'center',
        color: '#525252',
        paddingHorizontal: 0,
}
})

export default Information;