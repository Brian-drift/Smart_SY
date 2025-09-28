import React, {useEffect, useState} from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Classe from "@/app/(TABS) CLASSES/Reception/classe";
import LottieView from "lottie-react-native";

// Ajout des imports nécessaires pour la navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// soit l'ecran qui gére la connexion au SERVEUR.
const {width, height} =  Dimensions.get("window");

function Authentification(props: any) {
    const navigation = useNavigation();
    const route = useRoute();
    const { userRole } = route.params; // Récupère le rôle passé par l'écran précédent

    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');

    const loadProfile = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('profil_data');
            if (jsonValue != null) {
                const donnees = JSON.parse(jsonValue);
                // On met à jour l'état d'affichage avec les données chargées
                setNom(donnees.nom);
            }
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
        }
    };

/*----------------------------------------------------------------*/
    // Chargement initial des données
    useEffect(() => {
        loadProfile();
    }, []);
/*----------------------------------------------------------------*/


    const handlePress = async () => {
        // Début de la logique de simulation de connexion
        // C'est ici que l'appel API à votre serveur aura lieu

        // Simuler un appel API qui renvoie un jeton
        const mockToken = "fake-token" + userRole;
        const mockResponse = {
            token: mockToken,
            role: userRole
        };
        try {
            const donneesProfil = { nom };
            await AsyncStorage.setItem('profil_data', JSON.stringify(donneesProfil));

            // On met à jour l'état d'affichage APRÈS la sauvegarde
            setNom(nom);

            // Sauvegarde le jeton et le rôle dans le stockage local
            // C'est l'étape la plus importante pour "se souvenir" de l'utilisateur
            await AsyncStorage.setItem('userToken', mockResponse.token);
            await AsyncStorage.setItem('userRole', mockResponse.role);

            // Une fois le jeton sauvegardé, navigue vers le bon tableau de bord
            if (userRole === 'professeur') {
                navigation.navigate('glxArc');
            } else {
                navigation.navigate('EleveDashboard');
            }
        }catch(e) {
            Alert.alert('Erreur', 'Impossible de sauvegarder le profil.');
            console.error('Erreur de sauvegarde:', e);
            console.error("Erreur lors de la connexion :", e);
        }
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@/assets/lotties/SM_SY 3.json')}
                autoPlay={true}
                loop
                style={{width, height}}/>

            <Text style={styles.title}>Bonjours chers {userRole}</Text>

            <TextInput
                style={styles.inputP}
                placeholder="Entrez votre nom complet"
                value={nom}
                onChangeText={setNom}
            />

            <TextInput
                style={styles.input}
                placeholder="Entrez votre code d'accès"
                value={code}
                onChangeText={setCode}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.sauvegarder} onPress={handlePress}>
                <Text> Sauvegarder </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        position: 'absolute',
        top: '31%',
        fontSize: 24,
        fontWeight: '700',
        zIndex: 20,
        textAlign: 'center',
        width: '100%',
        color : 'rgba(0,0,0,0.5)',
    },
    elSecondaire : {
        alignItems: 'center',
        borderRadius : 15,
        position: "absolute",
        height: 30,
        width: 110,
        backgroundColor: "#f0f0f0",
        zIndex : 20,
        bottom: '10%',
        right: '1%',
    },
    input: {
        width: "90%",
        borderWidth: 2,
        borderColor: '#fdbe00',
        borderRadius: 5,
        padding: 10,
        position: "absolute",
        top : '50%',
        transform: 'translateY(-50%)',
        marginLeft: '5.5%'
    },
    inputP: {
        width: "90%",
        borderWidth: 2,
        borderColor: '#fdbe00',
        borderRadius: 5,
        padding: 10,
        position: "absolute",
        top : '43%',
        transform: 'translateY(-50%)',
        marginLeft: '5.5%',
    },
    sauvegarder: {
        bottom : 50,
        borderRadius : 40,
        backgroundColor: '#2c9cfc',
        position: 'absolute',
        width: '40%',
        height: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Authentification;
