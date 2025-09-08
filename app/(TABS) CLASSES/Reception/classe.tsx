import React, {useState, useCallback } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from "react-native";
import {MotiView} from "moti";
import LottieView from "lottie-react-native";
import {useNavigation,useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactComponent from "@/app/Information/factComponent";
import DateAffiche from "@/app/composants/dateAffiche";
import JoursAffiche from "@/app/composants/jourAffiche";
import MoisAffiche from "@/app/composants/moisAffiche";


function Classe(props: any ) {

    const [isHeight, setHeight] = useState( false )// gere la longeur du composant Authentification
    const handleHeight =  () => {
        setHeight(!isHeight);
    }
    // cette parti du code gere la navigation entre les ecrans
    const navigation = useNavigation();

    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

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
            setIsLoading(false);
        }
    };
    // -------------------------------------------------------------------
    // Utilisation de useFocusEffect pour charger les données à chaque fois
    // que l'écran est mis au premier plan
    // -------------------------------------------------------------------
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
    ); // Le tableau de dépendances vide [] garantit que la fonction n'est pas recréée à chaque rendu

    // Rendu conditionnel
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ fontSize : 18, color : '#0077FFFF',}}> Bonjours, chargement des données</Text>
            </View>
        );    }

    return (
        <View style={[styles.container, { backgroundColor : isHeight ? 'rgba(10,10,10,0.44)' : 'transparent',}]}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ecranProfile")}
                // Styles pour le bouton "Sauter"
                 style={{
                     position: 'absolute', // Positionnement absolu
                     top: 50, // Ajustez la position verticale
                     right: 20, // Ajustez la position horizontale
                     padding: 10,
                    // backgroundColor: 'rgba(0,0,0,0.2)', // Optionnel: un léger fond
                     borderRadius: 5,
                     zIndex: 10, // Assure que le bouton est au-dessus d'autres éléments
                        }}>
                <Text>Profils</Text>
            </TouchableOpacity>

            =======================================   * MOTI RETRACTABLE *   ===============================================
            <MotiView  style={[styles.motiView,]}
                       from={{
                           top : "0%",
                           width : "100%",
                           height : "1%",
                           backgroundColor : 'rgba(222,222,222,0.17)',
                       }}
                       animate = {{
                           top : '0%',
                           width : isHeight ? '100%' : '100%',
                           height : isHeight ?  '95%'  : '40%',
                           borderBottomRightRadius : 45,
                           borderBottomLeftRadius : 50,
                           backgroundColor : isHeight ? 'rgba(10,10,10,0.44)' : 'rgba(2,2,2,0.45)',
                           padding : 0
                       }}
                       transition={{
                           duration : 1000,
                           type: 'timing'
                       }}>
                <Text
                    style = {{
                        position : 'absolute',
                        zIndex : 1,
                        fontWeight : 400,
                        color : isHeight ? 'rgba(0,119,255,0)' :'#0077FFFF',
                        left: 25,
                        top : '16%',
                        fontSize : 16,
                    }}> Bonjour ! <Text style={{
                        fontSize : 18,
                        fontWeight : 'bold',
                        fontFamily: 'Rockwell',
                        color : isHeight ? 'rgba(0,119,255,0)' :'#ff5900',}}>{nom}</Text>
                </Text>
                {<FactComponent />}

                    <DateAffiche isHeight={isHeight}/> <JoursAffiche isHeight={isHeight}/> <MoisAffiche isHeight={isHeight}/>

                <TouchableOpacity onPress={handleHeight}>
                <LottieView style={{
                    justifyContent : 'center',
                    alignItems : 'center',
                    width : 40,
                    height : 20,
                    marginLeft : 20,
                    transform : isHeight ? [{ rotate : '270 deg'}] : [{ rotate : '90 deg'}]
                }}
                            autoPlay
                            loop
                            source={require('@/assets/lotties/lottieflow-arrow-04-1-000000-easey.json')}/>
            </TouchableOpacity>
            </MotiView>
            ===================================   --* MOTI RETRACTABLE *--   ======================================================

            ===================================   * CLASSES *   ======================================================
            <View style={styles.vuePrinClasses}>
                <View style={styles.ensembleClasse}>
                    <View style={styles.classeMin}>
                        {/* 1 er */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EcransDesPremieres")}>
                            <MotiView
                                style={{
                                    overflow : 'hidden',
                                    flexDirection: "row", // STYLES des composant à l'interieur de la vue
                                }}
                                from = {{
                                    width : 25,
                                    height : 25,
                                    backgroundColor : "#1a9cd7",
                                    borderRadius : 12.5,
                                }}
                                animate = {{
                                     width : 200,
                                     height : 91.25,
                                    margin : 2.5,
                                    borderTopLeftRadius : 50,
                                    borderRadius : 4,

                                }}
                                transition = {{
                                    duration : 500,
                           type: "timing"
                                }}>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 40,
                                    textAlign : 'start',
                                    margin : 0,
                                    top : 45,
                                    left : 15,
                                    color : '#dedede',}}>
                                    1</Text>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 35,
                                    textAlign : 'start',
                                    left : 15,
                                    top : 50,
                                    color : 'rgba(222,222,222,0.66)',
                                }}>Humanitè</Text>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 70,
                                    textAlign : 'start',
                                    left : -100,
                                    top : -50,
                                    color : 'rgba(222,222,222,0.33)',
                                    transform : [{ rotate : '-50 deg'}],
                                }}>Hum</Text>

                            </MotiView>
                        </TouchableOpacity>
                        {/* 2 eme */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EcransDesDeuxiemes")}>
                        >
                            <MotiView
                                style={{
                                    overflow : 'hidden',
                                    flexDirection: "row", // STYLES des composant à l'interieur de la vue
                                }}
                                from = {{
                                    width : 25,
                                    height : 25,
                                    backgroundColor : "#1a9cd7",
                                    borderRadius : 12.5,
                                }}
                                animate = {{
                                    width : 200,
                                    height : 91.25,
                                    margin : 2.5,
                                    borderRadius : 4,
                                }}
                                transition = {{
                                    duration : 1000,
                           type: "timing"
                                }}>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 40,
                                    textAlign : 'start',
                                    margin : 0,
                                    top : 45,
                                    left : 15,
                                    color : '#dedede',}}>
                                    2</Text>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 35,
                                    textAlign : 'start',
                                    left : 15,
                                    top : 50,
                                    color : 'rgba(222,222,222,0.66)',
                                }}>Humanitè</Text>
                                <Text style = {{
                                    fontWeight : 900,
                                    fontSize : 70,
                                    textAlign : 'start',
                                    left : -120,
                                    top : -45,
                                    color : 'rgba(222,222,222,0.33)',
                                    transform : [{ rotate : '-35 deg'}],
                                }}>Hum</Text>
                            </MotiView>
                        </TouchableOpacity>
                    </View>
                    {/* 3 eme */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EcransDesTroisiemes")}>
                        <MotiView
                            style={{
                                overflow : 'hidden',
                                flexDirection: "column", // STYLES des composant à l'interieur de la vue
                            }}
                            from = {{
                                width : 25,
                                height : 50,
                                backgroundColor : "#1a9cd7",
                                borderRadius : 12.5,
                            }}
                            animate = {{
                                width : 100,
                                height : 188,
                                margin : 2.5,
                                borderTopRightRadius: 50,
                                borderRadius : 0,
                            }}
                            transition = {{
                                duration : 1500,
                           type: "timing"
                            }}>
                            <Text style = {{
                                fontWeight : 900,
                                fontSize : 40,
                                textAlign : 'start',
                                margin : 10,
                                color : '#dedede',
                            }}>3</Text>
                            <Text style = {{
                                fontWeight : 900,
                                fontSize : 30,
                                textAlign : 'start',
                                right : -3,
                                top : -20,
                                color : 'rgba(222,222,222,0.73)',
                            }}>Hum</Text><Text style = {{
                            fontWeight : 900,
                            fontSize : 75,
                            textAlign : 'start',
                            left : 10,
                            top : -30,
                            color : 'rgba(222,222,222,0.42)',
                            transform : [{ rotate : '0 deg'}],
                        }}>Hum</Text>
                        </MotiView>
                    </TouchableOpacity>
                </View>
                {/* 4 eme */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("EcransDesQuatriemes")}>
                    <MotiView
                        style={{
                            flexDirection: "row", // STYLES des composant à l'interieur de la vue
                        }}
                        from = {{
                            width : 25,
                            height : 25,
                            backgroundColor : "#1a9cd7",
                            borderRadius : 12.5,
                        }}
                        animate = {{
                            width : 305,
                            height : 85,
                            margin : 2.5,
                            borderBottomEndRadius : 50,
                            borderBottomStartRadius : 50,
                            borderRadius : 4,
                        }}
                        transition = {{
                            duration : 1250,
                           type: "timing"
                        }}>
                        <Text style = {{
                            fontWeight : 900,
                            fontSize : 40,
                            textAlign : 'start',
                            margin : 0,
                            top : 25,
                            left : 15,
                            color : '#dedede',}}>
                            4</Text>
                        <Text style = {{
                            fontWeight : 900,
                            fontSize : 35,
                            textAlign : 'start',
                            left : 15,
                            top : 31,
                            color : 'rgba(222,222,222,0.66)',
                        }}>Humanitè</Text>
                        <Text style = {{
                            fontWeight : 900,
                            fontSize : 70,
                            textAlign : 'start',
                            left : -90,
                            top : -35,
                            color : 'rgba(222,222,222,0.33)',
                            transform : [{ rotate : '-20 deg'}],
                        }}>4 ème</Text>
                    </MotiView>
                </TouchableOpacity>
            </View>
            ===================================   --* CLASSES *--   ======================================================
            <View style ={{
                bottom : '-15%',// -80 en dessous du centre.
                margin : 10,
            }}>
                <Text style={{
                    fontWeight : 800,
                    color : '#1a9cd7',
                    fontSize : 14,
                    marginBottom :10 ,
                }}> INFO :</Text>
                <Text style={{
                    fontWeight : 400,
                    fontSize : 15,
                }}>
                    Fait le choix des syllabus dans toutes les classes, compare et apprend comme si tu etais dans les classes inférieurs et supérieurs.
                </Text>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center",
    },
    vuePrinClasses :{
        flexDirection : "column",
        bottom : '-15%', // -60 en dessous du centre.
    },
    ensembleClasse : {
        flexDirection : "row",
    },
    classeMin:{
        flexDirection : "column",
    },
    motiView: {
        position: 'absolute',
        backgroundColor: '#000000',
        zIndex : 1,
        padding: 5,
        top: 50,
    },
    flalisStyle : {
        flex : 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Classe;