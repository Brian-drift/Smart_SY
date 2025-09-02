import React, { useState } from 'react'; // N'oublie pas d'importer useState !
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Classe from "@/app/(TABS) CLASSES/Reception/classe";
import LottieView from "lottie-react-native";
// soit l'ecran qui gére la connexion au SERVEUR.

const {width, height} =  Dimensions.get("window");
function Authentification(props: any) {
    const  [isCodeScreen, setCodeScreen] = useState(false);

    const handlePress = async () => {
        try {
            await AsyncStorage.setItem('@doncJepeuxmettreninpoetquoiici', 'true');
            setCodeScreen(true);
        }catch(e) {
            console.error("Erreur mon pote");
        }
    }
    if (isCodeScreen) {
        return (
            <Classe/>
        )
    }

    return (
        <View>
            <LottieView
                source={require('@/assets/lotties/SM_SY 3.json')}
                autoPlay={true}
                loop
                style={{ width,  height}} />
                <TouchableOpacity style={styles.elSecondaire} onPress={handlePress}> <Text> passer </Text> </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre code d'accées"
            />
            <TextInput
                style={styles.inputP}
                placeholder="Entrez votre nom complet"
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
});

export default Authentification;