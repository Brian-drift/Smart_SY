import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

function Profils(props) {
    const [nom, setNom] = useState('');

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
        <View style={styles.container}>
            <Text style={styles.title}>
                {nom}
            </Text>

            <TouchableOpacity style={styles.container2}>
                <Ionicons name={"person-outline"} size={20} color="#5e5e5e" />
                <Text style={styles.nom}>
                    {nom}
                </Text>
                <Ionicons name={"pencil"} size={15} color="#5e5e5e" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container2}>
                <Ionicons name={"time-outline"} size={20} color="#5e5e5e" />
                <Text style={styles.nom}>
                    Mes accomplissement
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container2}>
                <FontAwesome name={"bar-chart"} size={20} color={"#525252"} />
                <Text style={styles.nom}>
                    Mes states
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container2}>
                <FontAwesome name={"bullseye"} size={20} color={"#00fa2a"}  />
                <Text style={styles.nom}>
                    Mes objéctifs en cours
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container2}>
                <FontAwesome name={"bullseye"} size={20} color={"rgba(0,0,0,0.21)"}  />
                <Text style={styles.nom}>
                    Mes objéctifs terminé
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        margin : 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginBottom : 40,
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.26)",
    },
    nom : {
        color: '#5e5e5e',
        fontFamily : 'System',
        fontSize : 16,
        fontWeight : '700',
        marginHorizontal : 10,
    },
})

export default Profils;