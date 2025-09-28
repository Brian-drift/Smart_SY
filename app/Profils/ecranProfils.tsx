import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from "@/app/themes";
import {useNavigation} from "@react-navigation/native";

const ProfilScreen = () => {
    const navigation = useNavigation();
    // L'état du formulaire (ce qui est tapé dans les TextInput)
    const [nom, setNom] = useState('');
    const  [classe, setClasse] = useState('');

    // L'état des données affichées (ce qui est sauvegardé)
    const [nomAffiche, setNomAffiche] = useState('')
    const [classeAffiche, setClasseAffiche] = useState('')

    const [isDark, setIsDark] = useState(false);

    // choisir le bon thème
    const theme = isDark ? darkTheme : lightTheme;

    const handleReset = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate("ChoixRole");
        }
        catch(e) {
            console.error(" erreur lors des l'effacement des donnèes",e);
        }
    }

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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.title}>Parametres</Text>
            {/* --------------------------------------------------- */}
            {/* Les informations sauvegardées s'affichent ici */}
            {/* --------------------------------------------------- */}
            <View style={[styles.savedDataContainer, {borderColor: theme.mainColor,}]}>
                <Text style={[styles.savedText, { color: theme.text }]}>{nomAffiche}</Text>
            </View>
            <Button title={'Recommencer'} onPress={handleReset}/>
            <TouchableOpacity style={styles.button} onPress={() => setIsDark(!isDark)}>
                <Text style={{ color: theme.text }}>Changer le Thème</Text>
            </TouchableOpacity>
            <Text>
                NB / cette partie est en cours de développement.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent : "space-evenly"
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
    },button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    savedDataContainer: {
        marginTop: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
    },
    savedText: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto',
    },
});

export default ProfilScreen;