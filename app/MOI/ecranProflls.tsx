import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilScreen = () => {
    // L'état du formulaire (ce qui est tapé dans les TextInput)
    const [nom, setNom] = useState('');
    const  [classe, setClasse] = useState('');

    // L'état des données affichées (ce qui est sauvegardé)
    const [nomAffiche, setNomAffiche] = useState('')
    const [classeAffiche, setClasseAffiche] = useState('')

    // Fonction pour charger les données sauvegardées au démarrage
    const loadProfile = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('profil_data');
            if (jsonValue != null) {
                const donnees = JSON.parse(jsonValue);
                // On met à jour l'état d'affichage avec les données chargées
                setNomAffiche(donnees.nom);
                setClasseAffiche(donnees.classe);
                // On met aussi à jour l'état du formulaire pour que les champs soient pré-remplis
                setNom(donnees.nom);
                setClasse(donnees.classe);
            }
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
        }
    };

    // Fonction pour sauvegarder les données
    const saveProfile = async () => {
        try {
            const donneesProfil = { nom, classe};
            await AsyncStorage.setItem('profil_data', JSON.stringify(donneesProfil));

            // On met à jour l'état d'affichage APRÈS la sauvegarde
            setNomAffiche(nom);
            setClasseAffiche(classe);

            setNom('')
            setClasse('')

            Alert.alert('Succès', 'Votre profil a été mis à jour.');
        } catch (e) {
            Alert.alert('Erreur', 'Impossible de sauvegarder le profil.');
            console.error('Erreur de sauvegarde:', e);
        }
    };

    // Chargement initial des données
    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Écran de Profil</Text>
            {/* --------------------------------------------------- */}
            {/* Les informations sauvegardées s'affichent ici */}
            {/* --------------------------------------------------- */}
            <View style={styles.savedDataContainer}>
                <Text style={styles.savedTitle}>Ce que je sais de TOI</Text>
                <Text style={styles.savedText}>Tu t'appelle: {nomAffiche}</Text>
                <Text style={styles.savedText}>Tu est en : {classeAffiche}</Text>
                <Text style={styles.savedDescription}>Sachez que vous pouvais changer ses données plus tard quand vous voudraiz.</Text>
            </View>

            {/* Les TextInput sont liés aux variables du formulaire */}
            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                value={nom}
                onChangeText={setNom}
                placeholder="Entrez votre nom"
            />
            <Text style={styles.label}>Ta classe</Text>
            <TextInput
                style={styles.input}
                value={classe}
                onChangeText={setClasse}
                placeholder="Entrez votre classe"
            />

            <Button title="Sauvegarder" onPress={saveProfile} />
        </View>
    );
};

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
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    savedDataContainer: {
        marginTop: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
    },
    savedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    savedDescription: {
        fontSize: 14,
        fontWeight: 'light',
        marginBottom: 10,
        marginTop: 10,
    },
    savedText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ProfilScreen;