import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Accueil() {
    const [isColor ,setColor] = useState(false)
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleGalaxiePress = () => {
        setColor(!isColor)
        navigation.navigate('ProfesseurDashboardGala')
       }
    const handleArchimedePress = () => {
        setColor(!isColor)
        navigation.navigate('ProfesseurDashboardArc')
       }

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
            // Dans tous les cas (succès ou échec), on arrête le chargement
            setIsLoading(true);
        }
    };
    useFocusEffect(
        useCallback(() => {
            // Réinitialiser l'état de chargement
            setIsLoading(true);
            // Lancer la fonction de chargement des données
            loadProfile();
            // Ici, on peut retourner une fonction de "nettoyage"
            return () => {
                // Optionnel : ce code s'exécute quand on quitte l'écran
            };
        }, [])
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bonjours à vous {nom}.
            </Text>
            <Text style={styles.texte}>
                Ça nous fait plasirs de vous revoir connecté.
            </Text>
            <Text style={styles.texte2}>
                Dans quelles section comptiez-vous données des syllabus aujourd'hui ?
            </Text>
            <View style={styles.content}>
                <TouchableOpacity onPress = {() => handleGalaxiePress()}>
                    <Text style={[styles.textLeft, { color: isColor ?  'rgba(0,0,0,0.73)': '#1a9cd7'}, {borderColor: isColor ? '#000000': '#1a9cd7',}]}>
                        Galaxie
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => handleArchimedePress()}>
                    <Text style={[styles.textRight,{ color: isColor ? '#1a9bd5' : 'rgba(0,0,0,0.73)'}, {borderColor: isColor ? '#1a9bd5': '#000000'}]}>
                        Archimede
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title : {
        position: 'absolute',
        top: '31%',
        fontSize: 24,
        fontWeight: '700',
        zIndex: 20,
        textAlign: 'center',
        width: '100%',
        color : 'rgba(0,0,0,0.66)',
    },
    texte : {
        position: 'absolute',
        top: '36%',
        fontSize: 18,
        fontWeight: '500',
        zIndex: 20,
        textAlign: 'center',
        width: '100%',
        color : 'rgba(0,0,0,0.66)',
    },
    texte2 : {
        position: 'absolute',
        top: '40%',
        fontSize: 16,
        fontWeight: '400',
        zIndex: 20,
        textAlign: 'center',
        width: '100%',
        color : 'rgba(0,0,0,0.51)',
    },
    textLeft: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        borderBottomWidth : 2,
        borderColor: '#1a9cd7',
    },
    textRight: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        borderBottomWidth : 2,
        borderColor: '#FD7F00FF',
    },

})

export default Accueil;