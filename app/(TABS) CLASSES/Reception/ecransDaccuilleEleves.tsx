import React, {useState, useRef, useCallback} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {MotiView} from "moti";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { height } = Dimensions.get("window");

export default function EcransDaccuilleEleves() {

    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    const openSheet = () => {
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeSheet = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const openActionSheet = () => {
        setOpen(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeActionSheet = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setOpen(false));
    };

    const navigation = useNavigation();
    const handleReset = async() => {
        try {
            await AsyncStorage.clear();
            alert(' Attention vos données viennes disparaitre ...')
            navigation.navigate("ChoixRole");
        } catch (error) {
            console.error(" erreur lors des l'effacement des donnèes",error);
        }
    };


    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
    );
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={'black'} size="small" />
            </View>
        );
    }
    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={openSheet}>
                <MotiView  style={styles.MotiView}
                           from = {{width : '30%', height : '5%',borderRadius : 12.5,}}
                           animate = {{width : "100%", height : '5%', margin : 2.5, borderTopLeftRadius : 50, borderRadius : 4,}}
                           transition = {{duration : 1500, type: "timing"}}>
                    <Text style={styles.nom}>
                        {nom}
                        <Ionicons name={"chevron-down"} size={15} color="#5e5e5e" />
                    </Text>

                    <TouchableOpacity style={styles.actionButton} onPress={openActionSheet}>
                        <Text style={styles.action}>
                            <FontAwesome name={"bullseye"} size={20} color={"#525252"}  /> </Text>
                    </TouchableOpacity>
                </MotiView>
            </TouchableNativeFeedback>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {visible && (
                <TouchableWithoutFeedback onPress={closeSheet}>
                    <View style={styles.overlay}>
                        <Animated.View
                            style={[
                                styles.sheetContainer,
                                { transform: [{ translateY: slideAnim }] },
                            ]}>
                            <View style={styles.sheetHeader}>
                                <Text style={styles.title}>Mon Compte 🎉</Text>
                                <TouchableOpacity onPress={closeSheet}>
                                    <Text style={styles.close}>Fermer</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("profils")}>
                                    <Text style={styles.text1}> {nom} </Text>
                                    <Ionicons name={"checkmark"} size={20} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2}>
                                    <Text style={styles.text2}> Cette semaine (Horraire)</Text>
                                    <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                                </TouchableOpacity>
                            </View>

                            <View>
                            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("messagerie")}>
                                <Text style={styles.text2}> Messagerie </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("parametre")}>
                                <Text style={styles.text2}> Paramètres </Text>
                                <Ionicons name={"chevron-forward"} size={20} color="#5e5e5e" />
                            </TouchableOpacity>
                        </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {open && (
                <TouchableWithoutFeedback onPress={closeActionSheet}>
                    <View style={styles.overlay}>
                        <Animated.View
                            style={[
                                styles.sheetContainer,
                                { transform: [{ translateY: slideAnim }] },
                            ]}>
                            <View style={styles.sheetHeader}>
                                <Text style={styles.title}>Actions</Text>
                                <TouchableOpacity onPress={closeActionSheet}>
                                    <Text style={styles.close}>Fermer</Text>
                                </TouchableOpacity>
                            </View>
===============================================================================================================
                        <TouchableOpacity style={styles.objectif}>
                            <FontAwesome name={"bullseye"} size={20} color={"#525252"}  />
                            <Text style={styles.content}>
                               Mes Objéctifs
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.objectif}>
                            <FontAwesome name={"line-chart"} size={20} color={"#525252"} />
                            <Text style={styles.content}>
                                Mes Stratégies
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.objectif} onPress={() => navigation.navigate("Notifications")}>
                            <FontAwesome name={"bell"} size={20} color={"#525252"} />
                            <Text style={styles.content}>
                                Mes Notifications
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.objectif}>
                            <FontAwesome name={"plus-circle"} size={20} color={"#525252"} />
                            <Text style={styles.content}>
                                Définire un nouvelles objetifs
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.objectif}>
                            <FontAwesome name={"bar-chart"} size={20} color={"#525252"} />
                            <Text style={styles.content}>
                                Voir mes stats
                            </Text>
                        </TouchableOpacity>
==============================================================================================================
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {/*<TouchableOpacity style={styles.restartButton} onPress={() => handleReset()}><Text style={{color : 'white', fontWeight : '500'}}> Tout révoir </Text></TouchableOpacity>*/}
        </View>
</GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2%',
    },
    MotiView : {
        position: 'absolute',
        top : "6%",
        justifyContent: 'center',
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.26)",
    },
    restartButton : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53,53,53,0.75)',
        height : 50,
        width : 150,
        borderRadius : 20,
    },
    nom : {
        position : 'absolute',
        color: '#5e5e5e',
        fontFamily : 'System',
        fontSize : 16,
        fontWeight : '700',
    },
    text1 : {
        color: '#5e5e5e',
        fontFamily : 'System',
        fontSize : 18,
        fontWeight : '700',
    },
    text2 : {
        color: '#5e5e5e',
        fontFamily : 'System',
        fontSize : 16,
        fontWeight : '500',
    },
    action : {
        color: '#5e5e5e',
        fontFamily : 'System',
        fontSize : 20,
        fontWeight : '700',
    },
    actionButton : {
        position : 'absolute',
        right : '1%',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parametreButton: {
        height: 50,
        width: 50,
        borderRadius : "10%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    sheetContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: height * 0.35,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    close: {
        color: "rgba(68,68,68,0.3)",
    },
    content: {
        marginHorizontal : 5,
        fontSize: 16,
        color: "#333"
    },
    content2: {
        marginTop: 12.5,
        marginHorizontal : 5,
        fontSize: 20,
        color: "#50e100",
    },
    button1 : {
        marginTop : "5%",
        padding : "3%",
        backgroundColor : "rgba(68,68,68,0.3)",
        borderTopRightRadius : 12,
        borderTopLeftRadius : 12,
        borderBottomWidth : 0.5,
        flexDirection: "row",
        justifyContent : "space-between",
    },
    button2 : {
        padding : "3%",
        backgroundColor : "rgba(68,68,68,0.3)",
        borderBottomRightRadius : 12,
        borderBottomLeftRadius : 12,
        borderTopWidth : 0.5,
        flexDirection: "row",
        justifyContent : "space-between",
    },
    objectif : {
        flexDirection: "row",
        marginTop : "6%",
    }
})