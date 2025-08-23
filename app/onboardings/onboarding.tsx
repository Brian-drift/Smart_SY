import React, {useState, useRef, useCallback} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    Button, // Nous allons utiliser Button pour l'exemple, mais TouchableOpacity serait mieux pour un style personnalisé
    Text,
    TouchableOpacity, TextInput, ImageBackground // Ajout de TouchableOpacity pour le bouton Skip
} from "react-native";
import slide from "@/app/onboardings/slides";
import OnboardingItems from "@/app/onboardings/onboardingItems";
import Paginator from "@/app/onboardings/paginator";
import MotiText from "@/app/moti/motiText";
import MotiAnim from "@/app/moti/motiAnim";



export default function Onboarding(){
    const scrollX = useRef(new Animated.Value(0)).current;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [showHomePage, setHomePage] = useState(false) // Correction du type de boolean
    const slideRef = useRef(null);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, []);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // Fonction pour passer à la slide suivante ou terminer l'onboarding
    const scrollToNextOrFinish = async () => { // Renommé pour plus de clarté
        if (currentIndex < slide.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            // L'utilisateur est sur la dernière slide et a cliqué pour avancer
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true');
                setHomePage(true); // Passe à la page d'accueilv
            } catch (error) {
                console.error("Erreur lors de l'enregistrement de l'onboarding :", error);
            }
        }
    }

    // NOUVELLE FONCTION pour le bouton "Sauter"
    const skipOnboarding = async () => {
        try {
            await AsyncStorage.setItem('@viewedOnboarding', 'true');
            setHomePage(true); // Passe directement à la page d'accueil
        } catch (error) {
            console.error("Erreur lors du saut de l'onboarding :", error);
        }
    };

    // Si showHomePage est vrai, affichez votre page d'accueil réelle ici
    // Pour l'exemple, affichons un texte simple
    if (showHomePage) {
        return (
                <MotiAnim/>
                /*afin de revoire l'onboarding si je veux*/
                /*<Button title="RéVOIR LE ONBOARDING" onPress={async () => {
                    await AsyncStorage.removeItem('@viewedOnboarding');
                    setHomePage(false);
                }}/>*/
        );
    }

    return(
        <View style={styles.container}>
            <View style={{
                flex : 3,
            }}>
                <FlatList data={slide}
                          renderItem={({ item }) => <OnboardingItems item={item}/> }
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          pagingEnabled = {true}
                          keyExtractor={(item) => item.id.toString()}
                          onScroll = { Animated.event([{ nativeEvent: {contentOffset : { x : scrollX } }}], {
                              useNativeDriver: false, // Optimisé pour la fluidité
                              // N'utilisez 'listener' que si vous avez VRAIMENT besoin d'une logique JS pendant le scroll
                          })}
                          scrollEventThrottle={ 16 } // Optimisé pour la fluidité
                          onViewableItemsChanged={onViewableItemsChanged}
                          viewabilityConfig={viewConfig}
                          ref = { slideRef }
                />
                <View style={styles.footer}>
                    <Paginator data={slide} scrollX={scrollX}/>
                    <Button
                        title={currentIndex === slide.length - 1 ? "Débuter" : ">>>"}
                        onPress={scrollToNextOrFinish}
                    />
                </View>
            </View>


            {/* NOUVEAU BOUTON : Sauter */}
            {currentIndex < slide.length - 1 && ( // Affiche le bouton "Sauter" seulement si ce n'est pas la dernière slide
                <TouchableOpacity onPress={skipOnboarding} style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>Sauter</Text>
                </TouchableOpacity>
            )}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Nécessaire pour positionner le bouton Sauter
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom : 10,
    },
    viewInput: {
        borderRadius: 15,
        backgroundColor:'rgba(0,0,0,0.4)',
        width: 300,
        height: 60,
        marginBottom: 20,
    },
    textInput: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        left : 10,
        fontSize: 17,
    },
    // Styles pour le bouton "Sauter"
    skipButton: {
        position: 'absolute', // Positionnement absolu
        top: 50, // Ajustez la position verticale
        right: 20, // Ajustez la position horizontale
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.2)', // Optionnel: un léger fond
        borderRadius: 5,
        zIndex: 10, // Assure que le bouton est au-dessus d'autres éléments
    },
    skipButtonText: {
        color: '#888', // Couleur du texte
        fontSize: 16,
        fontWeight: 'bold',
    },
});