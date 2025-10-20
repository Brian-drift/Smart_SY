import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {navigate} from "expo-router/build/global-state/routing";

export default function Parametre () {
    const navigation = useNavigation();
    // L'état du formulaire (ce qui est tapé dans les TextInput)
    const [nom, setNom] = useState('');
    const  [classe, setClasse] = useState('');

    // L'état des données affichées (ce qui est sauvegardé)
    const [nomAffiche, setNomAffiche] = useState('')
    const [classeAffiche, setClasseAffiche] = useState('')

    const [isDark, setIsDark] = useState(false);


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

    // Chargement initial des données
    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <View style={[styles.container]}>
            <Text style={styles.title}>Paramètres</Text>

            <TouchableOpacity style={[styles.savedDataContainer]} onPress={() => navigation.navigate("profils")}>
                <Ionicons name={"person-outline"} size={20} color="#5e5e5e" />
                <Text style={[styles.text1]}>{nomAffiche}</Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"pencil"} size={15} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("Classes")}>
                <Ionicons name={"people-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Classes
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"book"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("messagerie")}>
                <Ionicons name={"chatbubbles-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Messagerie
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("Notifications")}>
                <Ionicons name={"notifications-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Mes Notifications
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("Personalisation")}>
                <Ionicons name={"shirt-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Personalisation
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => handleReset()}>
                <Ionicons name={"reload"} size={20} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Récomencer
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("Apropos")}>
                <Ionicons name={"information-circle-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    A-propos
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate("Faq")}>
                <Ionicons name={"help-circle-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.text2}>
                    Question ? FAQ
                </Text>
                <View style={[styles.chevron, {position: "absolute", right : "1%", top : 5}]}>
                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
        backgroundColor: '#f5f5f5',
        justifyContent : "center"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.26)",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    },chevron: {
        padding: 10,
        borderRadius: 5,
    },
    savedDataContainer: {
        flexDirection : "row",
        marginTop: 30,
        marginBottom: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(68,68,68,0.36)',
        borderRadius: 8,
    },
    text1: {
        marginHorizontal : 20,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto',
    },
    text2: {
        marginHorizontal : 20,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto',
    },
    restartButton : {
        flexDirection : "row",
        marginBottom: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(100,100,100,0.38)',
        borderRadius: 8,
    },

});
