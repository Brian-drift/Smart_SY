import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Onboarding from "@/app/debut/OnboadingEleves/onboarding";
import Classe from "@/app/(TABS) CLASSES/Reception/classe";
import EcransDesPremieres from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_premieres";
import EcransDesDeuxiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_deuxiemes";
import EcransDesTroisiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_troisiemes";
import EcransDesQuatriemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_quatriemes";
import EditeursArchimede from "@/app/(TABS) CLASSES/Editeurs/editeursArchimede";
import authentification from "@/app/debut/Authentification/authentification";
import OnboardingProfesseurs from "@/app/debut/profOnboarding/OnboardingProfesseurs";
import glxArc from "@/app/(TABS) CLASSES/Editeurs/accueil";
import EditeursGalaxie from "@/app/(TABS) CLASSES/Editeurs/editeursGalaxie";
import ChoixDesClasses from "@/app/(TABS) CLASSES/Editeurs/choixDesClasses";
import EditionsDesDeuxiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_deuxiemes";
import EditionsDesPremieres from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_premieres";
import EditionsDesTroisiemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_troisiemes";
import EditionsDesQuatriemes from "@/app/(TABS) CLASSES/Editeurs/classes_superieurs/editions_des_quatriemes";
import PdfScreen from "@/app/(TABS) CLASSES/Reception/pdfScreen";
import EcransDaccuilleEleves from "@/app/(TABS) CLASSES/Reception/ecransDaccuilleEleves";
import parametre from "@/app/Paramètre/parametre";
import Personalisation from "@/app/Paramètre/personalisation";
import profils from "@/app/Paramètre/profils";
import messageries from "@/app/Paramètre/messageries";
import Notifications from "@/app/Paramètre/notifications";
import Apropos from "@/app/Paramètre/apropos";
import faq from "@/app/Paramètre/faq";

// Composant pour l'écran de choix de rôle
const ChoixRoleScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qui êtes-vous ?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Onboarding', { userRole: 'eleve' })}>
                <Text style={styles.buttonText}>Un Élève</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OnboardingProfesseurs', { userRole: 'professeur' })}>
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

                <Stack.Screen name={"glxArc"} component={glxArc}/>
                <Stack.Screen name={"ProfesseurDashboardGala"} component={EditeursGalaxie}/>
                <Stack.Screen name={"ProfesseurDashboardArc"} component={EditeursArchimede}/>
                <Stack.Screen name={"choixDesClasses"} component={ChoixDesClasses}/>

                <Stack.Screen name={"EleveDashboard"} component={EcransDaccuilleEleves}/>
                <Stack.Screen name={"Classes"} component={Classe}/>
                <Stack.Screen name={"pdfScreen"} component={PdfScreen}/>

                <Stack.Screen name={"parametre"} component={parametre} />
                <Stack.Screen name={"Personalisation"} component={Personalisation} />
                <Stack.Screen name={"profils"} component={profils} />
                <Stack.Screen name={"messagerie"} component={messageries} />
                <Stack.Screen name={"Notifications"} component={Notifications} />
                <Stack.Screen name={"Apropos"} component={Apropos} />
                <Stack.Screen name={"Faq"} component={faq} />
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