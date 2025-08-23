import React, { useState } from 'react'; // N'oublie pas d'importer useState !
import { MotiView, AnimatePresence } from 'moti';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MotiText from "@/app/moti/motiText";
import Classe from "@/app/classe";
import LottieView from "lottie-react-native";
// soit l'ecran qui gére la connexion au SERVEUR.

function MotiAnim(props: any) {
    const [isRed, setIsRed] = useState(false); // Notre état pour savoir si le carré est rouge ou non
    const  [isCodeScreen, setCodeScreen] = useState(false);
    const [isButton, setButton] = useState(false);

    const handleSecondButton= ()=>{
        setIsRed(!isRed);
        setButton(!isButton);
    }
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
            /* animation et apparition de la homeScreen */
            <Classe/>
        )
    }

    return (
        <View  style={styles.container}>
            <MotiText />
            <TouchableOpacity
                onPress={handleSecondButton} // Quand on appuie, on change l'état
                activeOpacity={1}
            >
                <MotiView
                    // Voici la magie de Moti !
                    // `from` définit l'état initial (quand le composant apparaît)
                    from={{
                        backgroundColor: '#0077ff',
                        width: 10,
                        height: 10,
                        borderRadius: 100,
                    }}
                    // `animate` définit l'état vers lequel il doit animer
                    // basé sur notre état `isRed`
                    animate={{
                        backgroundColor: isRed ? 'red' : '#0077ff', // Si isRed est vrai -> rouge, sinon -> bleu
                        width: isRed ? 150 : 100, // Si isRed est vrai -> plus grand, sinon -> taille normale
                        height: isRed ? 150 : 100,
                        borderRadius: isRed ? 100 : 100, // Si isRed est vrai -> rond, sinon -> carré
                    }}
                    // `transition` pour contrôler la douceur et la durée de l'animation
                    transition={{
                        type: 'timing', // Type d'animation (timing = durée fixe)
                        duration: 1000, // Durée en millisecondes (1 seconde)
                        // Courbe d'accélération/décélération
                    }}
                    style={styles.box} // Nos styles de base pour la boîte
                />
                <Text style={styles.text}>Appuie sur le cercle !</Text>
                <AnimatePresence>
                    { isButton &&
                        <TouchableOpacity style={styles.deuxiemeButton}
                                          onPress={handlePress}>
                            <MotiView
                                from = {{
                                    translateY : 70,
                                    translateX : 50, opacity : 0,
                                    width: 10,
                                    height: 10,}}
                                animate = {{
                                    translateY : 80,
                                    translateX : 180, opacity : 1,
                                    width: 40,
                                    height: 40,}}
                                exit = {{
                                    translateY : 55,
                                    translateX : 50, opacity : 0,width: 1,
                                    height: 1,}}
                                transition = {{type: 'timing', duration: 1000,}}
                                style = {styles.deuxiemeButton}
                            >
                                <LottieView style={{
                                    justifyContent : 'center',
                                    alignItems : 'center',
                                    width : 40,
                                    height : 40,
                                    marginLeft : 20,
                                }}
                                            autoPlay
                                            loop
                                    source={require('@/assets/lotties/lottieflow-arrow-04-1-000000-easey.json')}/>

                            </MotiView>
                        </TouchableOpacity>
                    }
                </AnimatePresence>
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
    // Pour l'ecran qui s'affiche que si le teteur appuis sur le bouton
    homeContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    box: {
        // Ces styles sont les styles "de base" de la vue
        // Les propriétés définies dans `from` et `animate` prendront le dessus
        // pour l'animation
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#626262',
        fontWeight: 'bold',
    },
    deuxiemeButton: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default MotiAnim;