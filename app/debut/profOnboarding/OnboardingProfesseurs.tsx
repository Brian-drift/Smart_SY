import React, {useState, useRef, useCallback} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity, TextInput, ImageBackground
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import slideProfesseurs from "@/app/debut/profOnboarding/slideProfesseurs";
import OnboardingItemsProfesseurs from "@/app/debut/profOnboarding/OnboardingItemsProfesseurs";
import PaginatorProf from "@/app/debut/profOnboarding/PaginatorProf";

export default function OnboardingProfesseurs(){
    const navigation = useNavigation();
    const route = useRoute();
    const { userRole } = route.params; // MODIFICATION 1: Récupère le rôle de l'écran précédent

    const scrollX = useRef(new Animated.Value(0)).current;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const slideRef = useRef(null);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, []);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // MODIFICATION 2: Navigue directement vers l'écran d'authentification
    // Le rôle est déjà connu, donc l'onboarding se termine par la page de connexion.
    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem('@viewedOnboarding', 'true');
            // Navigue vers l'écran d'authentification
            navigation.navigate('authentification', { userRole: userRole });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'onboarding :", error);
        }
    };

    // Fonction pour passer à la slide suivante
    const scrollToNext = () => {
        if (currentIndex < slideProfesseurs.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            finishOnboarding();
        }
    }

    // Fonction pour le bouton "Sauter"
    const skipOnboarding = () => {
        finishOnboarding(); // Saute directement à la fin du processus d'onboarding
    };

    // Le contenu de l'écran est affiché directement, sans condition
    return(
        <View style={styles.container}>
            <View style={{
                flex : 3,
            }}>
                <FlatList data={slideProfesseurs}
                          renderItem={({ item }) => <OnboardingItemsProfesseurs item={item}/> }
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          pagingEnabled = {true}
                          keyExtractor={(item) => item.id.toString()}
                          onScroll = { Animated.event([{ nativeEvent: {contentOffset : { x : scrollX } }}], {
                              useNativeDriver: false,
                          })}
                          scrollEventThrottle={ 16 }
                          onViewableItemsChanged={onViewableItemsChanged}
                          viewabilityConfig={viewConfig}
                          ref = { slideRef }
                />
                <View style={styles.footer}>
                    <PaginatorProf data={slideProfesseurs} scrollX={scrollX}/>
                    <Button
                        title={currentIndex === slideProfesseurs.length - 1 ? "Je commence" : ">>>"}
                        onPress={scrollToNext}
                    />
                </View>
            </View>

            {currentIndex < slideProfesseurs.length - 1 && (
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
        position: 'relative',
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
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
    },
    skipButtonText: {
        color: '#888',
        fontSize: 16,
        fontWeight: 'bold',
    },
});