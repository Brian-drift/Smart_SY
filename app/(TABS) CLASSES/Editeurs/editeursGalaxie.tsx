import React, {useCallback, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Button,
    FlatList,
    SafeAreaView,
    useWindowDimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, useFocusEffect, useRoute} from "@react-navigation/native";
import ArchimedeItems from "@/app/composants/archimedeItems";
import LottieView from "lottie-react-native";
import {fetchClassesGala} from "@/app/composants/listeDesClassesGalaxie";

function EditeursGalaxie() {
    const {width} = useWindowDimensions();
    const [classes, setClasses] = useState([]);
    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

    const navigation =  useNavigation();

    const handleReset = async() => {
        try {
            await AsyncStorage.clear();
            navigation.navigate("ChoixRole");
        } catch (error) {
            console.error(" erreur lors des l'effacement des donnèes",error);
        }
    };

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
            fetchClassesGala()
                .then(data => {
                    setClasses(data);
                })
                .catch(erreur => {
                    console.error('Erreur lors de la récupération :', erreur);
                })
                .finally(() => {
                    setIsLoading(false);
                })
            // Lancer la fonction de chargement des données
            loadProfile();
            // Ici, on peut retourner une fonction de "nettoyage"
            return () => {
                // Optionnel : ce code s'exécute quand on quitte l'écran
            };
        }, [])
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <LottieView
                    autoPlay // L'animation démarre automatiquement
                    loop // L'animation se répète en boucle
                    style={[styles.lottieAnimation, { width }]}
                    source={require('@/assets/lotties/loading.json')} />
                <Text style={{ fontSize : 18, color : '#0077FFFF',}}> Bonjours, chargement des données</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title1}>Galaxie</Text>
            <View style={{
                width : '90%',
                height : '70%'
            }}>
                <FlatList data={classes}
                          keyExtractor={item => item.id}
                          renderItem={({item}) => (<ArchimedeItems item={item}/>)}/>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent : 'center',
            alignItems: "center",
            width : "100%",
        },
        centered: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        item : {
            padding : 10,
            fontSize : 16,
            borderBottomWidth : 1,
            borderBottomColor : "#ccc",
        },
        title : {
            fontWeight : 'bold',
        },
        category : {
            color  : '#000000',
        },
        lottieAnimation: {
            flex: 0.7, // Prend la même proportion que votre ancienne image
            justifyContent: 'center',
            alignSelf: 'center', // Centre l'animation horizontalement
        },
        title1 : {
            fontSize: 36,
            fontWeight: 'bold',
            marginTop: 25,
            marginBottom: 20,
            color:'rgba(0,0,0,0.76)',
        },
    }
)

export default EditeursGalaxie;