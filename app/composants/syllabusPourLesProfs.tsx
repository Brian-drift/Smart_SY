import React, {useCallback, useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";

export default function SyllabusCardProfesseurs( item) {
    const [nom, setNom] = useState('');
    const navigation = useNavigation();

    const loadProfile = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('profil_data');
            if (jsonValue != null) {
                const donnees = JSON.parse(jsonValue);
                setNom(donnees.nom);
            }
        } catch (e) {
            console.error('Erreur lors du chargement :', e);
        } finally {

        }
    };

    useFocusEffect(
        useCallback(() => {
            // Lancer la fonction de chargement des données
            loadProfile();
            // Ici, on peut retourner une fonction de "nettoyage"
            return () => {
                // Optionnel : ce code s'exécute quand on quitte l'écran
            };
        }, [])
    );
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.presentation}> par MR/MD : {nom}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        bottom :35,
        width: '40%',
        height: 180,
        borderWidth: 5,
        borderRadius: 8,
        borderColor: '#ffffff',
        top : 3,
        margin: 20,
        // Ombres pour iOS
        shadowColor: '#000',
        shadowOffset : {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        // Ombre pour Android
        elevation: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    text: {
        textAlign: 'left',
        fontSize: 24,
        color: '#353535',
        fontWeight: 700,
        fontFamily : 'system',
    },
    presentation : {
            textAlign: 'left',
            fontSize: 12,
            color: '#8e8e8e',
            fontWeight: 400,
            fontFamily : 'system',
        }
});
