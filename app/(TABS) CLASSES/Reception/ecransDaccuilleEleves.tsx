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
    ActivityIndicator, Modal, TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {MotiView} from "moti";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import DateAffiche from "@/app/composants/dateAffiche";
import MoisAffiche from "@/app/composants/moisAffiche";
import JoursAffiche from "@/app/composants/jourAffiche";
import {saveActivityForToday} from "@/app/composants/saveActivityForToday";

const { height } = Dimensions.get("window");

export default function EcransDaccuilleEleves() {

    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [titre , setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('');

    const navigation = useNavigation();

    function handleAdd() {

        if (!titre || !description || !categorie) {
            console.log("Les champs ne sont pas remplis.");
            return;
        }

        const activity = {
            titre,
            description,
            categorie,
            createdAt: new Date().toISOString()
        };
        saveActivityForToday(activity);
    }


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
                </MotiView>


            </TouchableNativeFeedback>
            <View style={styles.contente}>
                <TouchableOpacity onPress={openActionSheet} style={styles.plusButton}>
                        <FontAwesome name={"plus"} size={20} color={"#a7a7a7"}  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Calendars")} style={{flexDirection: 'row'}}>
                    <JoursAffiche />
                    <DateAffiche />
                    <MoisAffiche />
                </TouchableOpacity>
            </View>





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
                <Modal
                    transparent={true}
                    animationType="fade"
                    presentationStyle={"pageSheet"}
                    onRequestClose={closeActionSheet}>
                    <View style={styles.overlayModal}>
                        <Animated.View
                            style={[
                                styles.sheetContainerModal,
                                { transform: [{ translateY: slideAnim }] },
                            ]}>


                            <View style={styles.sheetHeader}>
                                <Text style={styles.title}>Créer un objectif</Text>
                            </View>

                            <View style={{
                                alignItems : "center"
                            }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nom de l'objectif"
                                    placeholderTextColor="#aaa"
                                    value={titre}
                                    onChangeText={setTitre}
                                />

                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Lache toi pourquoi cet objectif ?"
                                    placeholderTextColor="#aaa"
                                    multiline
                                    value={description}
                                    onChangeText={setDescription}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Pendant combien de jours !?"
                                    placeholderTextColor="#aaa"
                                    keyboardType="numeric"
                                    value={categorie}
                                    onChangeText={setCategorie}
                                />
                                <Text style={styles.sectionTitle}>Quand est tu prét à t'y mettre pour cette objectif ?</Text>
                                <View style={styles.triggerRow}>
                                    {["free", "time", "action"].map(type => (
                                        <TouchableOpacity
                                            key={type}
                                            style={[
                                                styles.triggerButton,
                                            ]}
                                        >
                                            <Text style={styles.triggerText}>
                                                {type === "free" && "Libre"}
                                                {type === "time" && "Heure"}
                                                {type === "action" && "Après une action"}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.cancelBtn} onPress={closeActionSheet}>
                                        <Text style={styles.cancelText}>Annuler</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                                        <Text style={styles.saveText}>Créer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        <View style={{
                            flexDirection : 'row',
                            justifyContent : 'space-evenly',
                            marginTop : 20
                        }}>

                            {/*<View style={styles.box}>
                                <TouchableOpacity style={styles.butBox}>
                                    <Text style={{fontSize: 20}}> 3h </Text> <Text> Par semaine </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.butBox}>
                                    <Text style={{fontSize: 20}}> 6h </Text> <Text> Par semaine </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.butBox}>
                                    <Text style={{fontSize: 20}}> 9h </Text> <Text> Par semaine </Text>
                                </TouchableOpacity>
                            </View>*/}
                        </View>
                        </Animated.View>
                    </View>
                </Modal>
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
        pickerContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
    plusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2%',
    },
    contente : {
        paddingTop : 10,
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
        top : "10%",
        flexDirection: "row",
    },
    MotiView : {
        position: 'absolute',
        top : "6%",
        justifyContent: 'center',
        borderBottomWidth : 1,
        borderColor : "rgb(251,127,5)",
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
    text3: {
        fontSize: 16,
        color: "#333",
        marginTop : 10,
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
    box : {
        justifyContent: 'space-evenly',
    },
    butBox : {
        margin : 10,
        flexDirection : "row",
        alignItems : "flex-end",
        borderBottomWidth : 1,
        borderColor : "rgb(168,168,168)",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(192,192,192,0.21)",
        justifyContent: "flex-end",
    },
    sheetContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
    },
    overlayModal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(217,217,217,0.4)",
        justifyContent: "center",
        padding: '2%',
    },
    sheetContainerModal: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom : 20
    },
    close: {
        color: "rgba(68,68,68,0.3)",
    },
    content: {
        fontWeight : "500",
        fontSize: 18,
        color: "#333",
        borderBottomWidth : 1,
        borderColor : "rgb(169,169,169)",
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
        borderBottomWidth : 1,
        borderColor : "rgb(169,169,169)",
    },
    input: {
        width : '100%',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        color: "#333",
    },
    textArea: {
        height: 80,
    },
    triggerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    triggerButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#aaa",
        alignItems: "center",
    },
    triggerActive: {
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
    },
    triggerText: {
        color: "black",
        fontWeight: "600",
    },
    timeButton: {
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 10,
        alignItems: "center",
    },
    sectionTitle: {
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 15,
    },
    cancelBtn: {
        padding: 12,
        marginRight: 10,
    },
    saveBtn: {
        backgroundColor: "#4caf50",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    cancelText: {
        fontSize: 16,
        color: "#bebebe",
    },
    saveText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
})