import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Onboarding from "@/app/debut/OnboadingEleves/onboarding";
import Classe from "@/app/(TABS) CLASSES/Reception/classe";
import ecranProfils from "@/app/Profils/ecranProfils";
import EcransDesPremieres from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_premieres";
import EcransDesDeuxiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_deuxiemes";
import EcransDesTroisiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_troisiemes";
import EcransDesQuatriemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_quatriemes";
import EditeursArchimede from "@/app/(TABS) CLASSES/Editeurs/editeursArchimede";
import authentification from "@/app/Authentification/authentification";
import OnboardingProfesseurs from "@/app/debut/profOnboarding/OnboardingProfesseurs";
import glxArc from "@/app/(TABS) CLASSES/Editeurs/accueil";
import EditeursGalaxie from "@/app/(TABS) CLASSES/Editeurs/editeursGalaxie";
import ChoixDesClasses from "@/app/(TABS) CLASSES/Editeurs/choixDesClasses";
import editions_des_deuxiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_deuxiemes";
import editions_des_troisiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_troisiemes";
import editions_des_quatriemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_quatriemes";
import EditionsDesPemiers from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_premieres";
import EditionsDesDeuxiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_deuxiemes";
import EditionsDesPemieres from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_premieres";
import EditionsDesPremieres from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_premieres";
import EditionsDesTroisiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_troisiemes";
import EditionsDesQuatriemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_quatriemes";
import PDFUploader from "@/app/(TABS) CLASSES/Editeurs/pdfUploader";

// Nouveau composant pour l'écran de choix de rôle
const ChoixRoleScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qui êtes-vous ?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Onboarding', { userRole: 'eleve' })}
            >
                <Text style={styles.buttonText}>Un Élève</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OnboardingProfesseurs', { userRole: 'professeur' })}
            >
                <Text style={styles.buttonText}>Un Professeur</Text>
            </TouchableOpacity>
        </View>
    );
};


const Stack = createNativeStackNavigator();

export default function Index() {
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('userRole');
                const storedToken = await AsyncStorage.getItem('userToken');

                if (storedToken && storedRole) {
                    if (storedRole === 'professeur') {
                        setInitialRoute('glxArc');
                    } else {
                        setInitialRoute('EleveDashboard');
                    }
                } else {
                    setInitialRoute('ChoixRole');
                }
            } catch (error) {
                console.error("Erreur de récupération :", error);
                setInitialRoute('ChoixRole');
            }
        };
        checkUserStatus();
    }, []);


    if (initialRoute === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
            <Stack.Screen name={"ChoixRole"} component={ChoixRoleScreen}/>
            <Stack.Screen name={"Onboarding"} component={Onboarding}/>
            <Stack.Screen name={"OnboardingProfesseurs"} component={OnboardingProfesseurs}/>
            <Stack.Screen name={"authentification"} component={authentification}/>

            <Stack.Screen name={"EcransDesPremieres"} component={EcransDesPremieres}/>
            <Stack.Screen name={"EcransDesDeuxiemes"} component={EcransDesDeuxiemes}/>
            <Stack.Screen name={"EcransDesTroisiemes"} component={EcransDesTroisiemes}/>
            <Stack.Screen name={"EcransDesQuatriemes"} component={EcransDesQuatriemes}/>

            <Stack.Screen name={"editions_des_premieres"} component={EditionsDesPremieres}/>
            <Stack.Screen name={"editions_des_deuxiemes"} component={EditionsDesDeuxiemes}/>
            <Stack.Screen name={"editions_des_troisiemes"} component={EditionsDesTroisiemes}/>
            <Stack.Screen name={"editions_des_quatriemes"} component={ EditionsDesQuatriemes}/>

            <Stack.Screen name={"EleveDashboard"} component={Classe}/>
            <Stack.Screen name={"ProfesseurDashboardArc"} component={EditeursArchimede}/>
            <Stack.Screen name={"glxArc"} component={glxArc}/>
            <Stack.Screen name={"ProfesseurDashboardGala"} component={EditeursGalaxie}/>
            <Stack.Screen name={"choixDesClasses"} component={ChoixDesClasses}/>
            <Stack.Screen name={"pdfploader"} component={PDFUploader}/>

            <Stack.Screen name={"ecranProfils"} component={ecranProfils} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#575757',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
    },
});