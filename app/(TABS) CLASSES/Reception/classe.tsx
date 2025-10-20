import React, {useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions, useWindowDimensions, TouchableNativeFeedback
} from "react-native";
import {MotiView} from "moti";
import {useNavigation,useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactComponent from "@/app/Information/factComponent";
import DateAffiche from "@/app/composants/dateAffiche";
import JoursAffiche from "@/app/composants/jourAffiche";
import MoisAffiche from "@/app/composants/moisAffiche";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const height = Dimensions.get('window').height;

const HEADER_HEIGHT = height - 50 ; // Définit la hauteur de base de l'en-tête.

function Classe( ) {

    const savedHeight = useSharedValue(HEADER_HEIGHT);
    const translateY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        // Quand le geste commence, on réinitialise la position du doigt.
        onStart: () => {
            translateY.value = 0;
        },
        // Pendant le geste, on met à jour la position du doigt.
        onActive: (event) => {
            translateY.value = event.translationY;
        },
        // Quand le geste se termine (doigt levé), on calcule la nouvelle hauteur et on l'anime.
        onEnd: () => {
            // Mappe la position du doigt à une nouvelle hauteur pour l'en-tête.
            const newHeight = interpolate(
                translateY.value,
                [-50, 0, 50], // Si le doigt a bougé de -200 à 200...
                [850, savedHeight.value, height + 980], // ...la nouvelle sera de 60 à 300.
                Extrapolate.CLAMP// Empêche la valeur d'aller au-delà de ces limites.
            );

            // Anime la transition vers la nouvelle hauteur avec un effet de ressort.
            savedHeight.value = withSpring(newHeight, {
                damping: 16, // Plus la valeur est élevée, plus l'animation est amortie.
                stiffness: 150, // Plus la valeur est élevée, plus l'animation est "rigide".
            });

            // Réinitialise la position du doigt pour le prochain geste.
            translateY.value = 0;
        },
    });

    const animatedHeaderStyle = useAnimatedStyle(() => {
        // Calcule la hauteur de l'en-tête en temps réel pendant le glissement.
        const height = interpolate(
            translateY.value,
            [200, 0, -200],
            [savedHeight.value - 10, savedHeight.value, savedHeight.value + 80],
            Extrapolate.CLAMP
        );
        return { height };
    });

    // cette parti du code gere la navigation entre les ecrans
    const navigation = useNavigation();

    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

    const handleReset = async() => {
        try {
            await AsyncStorage.clear();
            alert(' Attention vos données viennes disparaitre ...')
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
    const {width} = useWindowDimensions();
    // Rendu conditionnel
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
        <View style={[styles.container]}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ecranProfils")}
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
                <Text>Params</Text>
            </TouchableOpacity>

            =======================================   * LA PARTIE RETRACTABLE *   ===============================================

            <GestureHandlerRootView>
            {/* Le PanGestureHandler écoute les glissements. */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.header, animatedHeaderStyle]}>
                            <Text style={{
                                position: 'absolute', // Positionnement absolu
                                top: 50, // Ajustez la position verticale
                                left: 20, // Ajustez la position horizontale
                                padding: 10,
                                // backgroundColor: 'rgba(0,0,0,0.2)', // Optionnel: un léger fond
                                borderRadius: 5,
                                zIndex: 10,
                                fontWeight : '500',
                            }}>bonjour <Text style={{
                                    fontSize : 14,
                                    fontWeight : '700',
                                    fontFamily : 'system',
                                color : '#FD7F00FF',
                            }}>
                                {nom}
                            </Text>
                            </Text>
                            <FactComponent/>

                            <View style = {{flex : 0.4, justifyContent: "space-evenly", flexDirection:'row', borderBottomWidth : 1, }}>
                            <JoursAffiche /> <DateAffiche/> <MoisAffiche />
                            </View>

                            <Text style={{
                                fontWeight : 400,
                                fontSize : 14,
                                marginBottom : 15,
                                paddingTop : 15,
                                color : 'rgba(0,0,0,0.41)'
                            }}> Swipe vers le bas </Text>
                            <View style={styles.vuePrinClasses}>
                                <View style={styles.ensembleClasse}>
                                    <View style={styles.classeMin}>
                                        {/* 1 er */}
                                        <TouchableNativeFeedback onPress={() => navigation.navigate("EcransDesPremieres",)}>
                                            <MotiView
                                                style={{overflow : 'hidden', flexDirection: "row", // STYLES des composant à l'interieur de la vue
                                            }}
                                                from = {{width : 25, height : 25, backgroundColor : "#eeeeee", borderRadius : 12.5,}}
                                                animate = {{width : 200, height : 91.25, margin : 2.5, borderTopLeftRadius : 50, borderRadius : 4, backgroundColor : "#626262"}}
                                                transition = {{duration : 500, type: "timing"}}>
                                                <Text style = {{fontWeight : 900, fontSize : 40, textAlign : 'start', margin : 0, top : 45, left : 15, color : 'rgba(222,222,222,0.65)',}}>1</Text>
                                                <Text style = {{fontWeight : '700', fontSize : 36, textAlign : 'start', left : 15, top : 50, color : 'rgba(222,222,222,0.27)',}}>Humanitè</Text>
                                                <Text style = {{fontWeight : 900, fontSize : 70, textAlign : 'start', left : -100, top : -50, color : 'rgba(222,222,222,0.07)', transform : [{ rotate : '-50 deg'}],}}>Hum</Text>
                                            </MotiView>
                                        </TouchableNativeFeedback>
                                        {/* 2 eme */}
                                        <TouchableNativeFeedback onPress={() => navigation.navigate("EcransDesDeuxiemes")}>
                                            <MotiView
                                                style={{
                                                    overflow : 'hidden',flexDirection: "row", // STYLES des composant à l'interieur de la vue
                                                }}
                                                from = {{width : 25, height : 25, backgroundColor : "#eeeeee",borderRadius : 12.5,}}
                                                animate = {{width : 200, height : 91.25, margin : 2.5, borderRadius : 4, backgroundColor : "#626262"}}
                                                transition = {{duration : 1000, type: "timing"}}>
                                                <Text style = {{fontWeight : 900, fontSize : 40, textAlign : 'start', margin : 0, top : 45, left : 15,  color : 'rgba(222,222,222,0.7)'}}>2</Text>
                                                <Text style = {{fontWeight : "700", fontSize : 36, textAlign : 'start', left : 15, top : 50, color : 'rgba(222,222,222,0.44)',}}>Humanitè</Text>
                                                <Text style = {{fontWeight : 900, fontSize : 70, textAlign : 'start', left : -120, top : -45, color : 'rgba(222,222,222,0.16)', transform : [{ rotate : '-35 deg'}],}}>Hum</Text>
                                            </MotiView>
                                        </TouchableNativeFeedback>
                                    </View>
                                    {/* 3 eme */}
                                    <TouchableNativeFeedback onPress={() => navigation.navigate("EcransDesTroisiemes")}>
                                        <MotiView style={{
                                                overflow : 'hidden', flexDirection: "column", // STYLES des composant à l'interieur de la vue
                                        }}
                                            from = {{width : 25, height : 50, backgroundColor : "#eeeeee", borderRadius : 12.5}}
                                            animate = {{width : 100, height : 188, margin : 2.5, borderTopRightRadius: 50, borderRadius : 0, backgroundColor : "#626262"}}
                                            transition = {{duration : 1500, type: "timing"}}>
                                            <Text style = {{fontWeight : 900, fontSize : 40, textAlign : 'start', margin : 10, top : 37, color : 'rgba(222,222,222,0.76)',}}>3</Text>
                                            <Text style = {{fontWeight : '700', fontSize : 36, textAlign : 'start', right : -3, top: 15, color : 'rgba(222,222,222,0.54)',}}>Hum</Text>
                                            <Text style = {{fontWeight : 900, fontSize : 75, textAlign : 'start', left : 10, top : -25, color : 'rgba(222,222,222,0.21)', transform : [{ rotate : '-20 deg'}],}}>Hum</Text>
                                        </MotiView>
                                    </TouchableNativeFeedback>
                                </View>
                                {/* 4 eme */}
                                <TouchableNativeFeedback
                                    onPress={() => navigation.navigate("EcransDesQuatriemes")}>
                                    <MotiView style={{
                                            flexDirection: "row", // STYLES des composant à l'interieur de la vue
                                        }}
                                        from = {{width : 25, height : 25, backgroundColor : "#eeeeee", borderRadius : 12.5,}}
                                        animate = {{width : 305, height : 85, margin : 2.5, borderBottomEndRadius : 50, borderBottomStartRadius : 50, borderRadius : 4, backgroundColor : "#626262"}}
                                        transition = {{duration : 1250, type: "timing"}}>
                                        <Text style = {{fontWeight : 900, fontSize : 40, textAlign : 'start', margin : 0, top : 25, left : 15, color : '#dedede',}}>4</Text>
                                        <Text style = {{fontFamily : 'system', fontWeight : 700, fontSize : 36, textAlign : 'start', left : 15, top : 31, color : 'rgba(222,222,222,0.76)',}}>Humanitè</Text>
                                        <Text style = {{fontFamily : 'system', fontWeight : 900, fontSize : 70, textAlign : 'start', left : -90, top : -35, color : 'rgba(222,222,222,0.33)', transform : [{ rotate : '-20 deg'}],}}>4 ème</Text>
                                    </MotiView>
                                </TouchableNativeFeedback>
                            </View>

                            <View style ={{
                            marginHorizontal : 10,
                                marginVertical : 40,
                        }}>
                            <Text style={{
                                fontWeight : 700,
                                color : 'rgba(0,0,0,0.44)',
                                fontSize : 18,
                            }}> INFO :</Text>
                            <Text style={{
                                fontWeight : 400,
                                fontSize : 16,
                            }}>
                                Fait le choix des syllabus dans toutes les classes, compare et apprend comme si tu etais dans les classes inférieurs et supérieurs en même temps.
                            </Text>
                            </View>
                    <TouchableOpacity style={styles.restartButton} onPress={() => handleReset()}><Text style={{color : 'white', fontWeight : '500'}}> Tout révoir </Text></TouchableOpacity></Animated.View>
                    </PanGestureHandler>
            </GestureHandlerRootView>
        </View>

    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 5,
        backgroundColor : "#ababab",
    },
    vuePrinClasses :{
        flexDirection : "column",
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
        alignItems: 'center',
        justifyContent : 'center',
    },
    flalisStyle : {
        flex : 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    height : {
        height : 3,
        width : '50%',
        backgroundColor : 'rgba(255,255,255,0.47)',
        borderRadius: '10%'
    },
    header: {
        backgroundColor: "rgba(0,0,0,0)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    lottieAnimation: {
        flex: 0.7, // Prend la même proportion que votre ancienne image
        justifyContent: 'center',
        alignSelf: 'center', // Centre l'animation horizontalement
        // Vous pouvez ajuster la hauteur si nécessaire, par exemple height: 300,
    },
    restartButton : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53,53,53,0.75)',
        height : 50,
        width : 150,
        borderRadius : 20,
    }

})

export default Classe;