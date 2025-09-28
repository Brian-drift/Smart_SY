import React, {useState} from 'react';
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useRoute} from "@react-navigation/native";
import SyllabusCardProfesseurs from "@/app/composants/syllabusPourLesProfs";
import * as DocumentPicker from "expo-document-picker";


const EditionsDesDeuxiemes = () => {
    const [isModalOpen, setModalOpen] =useState(false);
    const [pdfUrl ,setPdfUrl] = useState("");
    const [syllabusList, setSyllabusList] = useState([]);
    const route = useRoute();
    const { item } = route.params;
    const [pdfName, setPdfName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const pickAndSendPdf = async () => {
        try {
            // 🔹 Étape 1 : Ouvrir le sélecteur pour choisir un PDF
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
            });

            console.log("Résultat du picker :", result);

            // 🔹 Étape 2 : Vérifier que l'utilisateur a bien choisi un fichier
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0]; // On prend le premier fichier sélectionné
                setPdfName(file.name);
                setSelectedFile(file);

                // 🔹 Étape 3 : Préparer le PDF pour l'envoi au backend
                const formData = new FormData();
                formData.append("file", {
                    uri: file.uri,           // chemin vers le PDF sur l'appareil
                    type: "application/pdf", // type MIME
                    name: file.name,         // nom du fichier
                });

                // 🔹 Étape 4 : Envoi au backend
                const response = await fetch("https://mon-backend.com/upload", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const resultBackend = await response.json();
                // exemple : { url: "https://mon-backend.com/files/chapitre1.pdf" }

                // 🔹 Étape 5 : Créer la carte avec le lien PDF généré par le backend
                const newSyllabusData = {
                    id: Date.now().toString(), // identifiant unique
                    text: file.name,           // nom du PDF
                    url: resultBackend.url,
                    // lien vers le PDF
                };
                setSyllabusList(prev => [...prev, newSyllabusData]);

                console.log("Nouvelle carte créée :", newSyllabusData);

                // Ici tu peux envoyer newSyllabusData dans ta liste ou la stocker dans ta base
            } else {
                console.log("Aucun fichier choisi ou action annulée");
            }
        } catch (error) {
            alert(" Cette fonction sera prête lorsque la base de données sera terminer ")
            console.error("Erreur lors du choix/envoi du PDF :", error);
        }
        setModalOpen(false);

    };

    const renderItem = ({ item }) => (
        <SyllabusCardProfesseurs name={item.text} url={item.url} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Premières </Text>
            <Text  style={styles.textDim}>
                {item.diminutif}
            </Text>

            <FlatList
                numColumns={2}
                data={syllabusList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
            />


            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalOpen(true)}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>+</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                animationType="fade"
                presentationStyle={"fullScreen"}
            >
                <View style={styles.viewInModal}>
                    <View style={styles.viewInModalContainer}>
                        <Text style={styles.txt}>
                            veuillez chargez le syllabus sous format PDF
                        </Text>
                        {pdfName ? <Text style={{ marginTop: 10 }}>Fichier sélectionné : {pdfName}</Text> : null}
                        <View style={styles.princ}>
                            <TouchableOpacity style={styles.btnGroup} onPress={pickAndSendPdf}>
                                <Text style={styles.text1}>
                                    CHARGER
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnGroup1} onPress={() => setModalOpen(false)}>
                                <Text style={styles.text2}>
                                    PLUS TARD
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    flatListContent: {
        padding: 0,
        width: '100%',
    },
    addButton: {
        position: 'absolute',
        borderRadius: 25,
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewInModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    viewInModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '75%',
        height: '30%',
        borderRadius: 18,
    },
    txt: {
        marginTop: 15,
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        fontWeight: '700',
    },
    princ: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        top: 15,
        width: '100%',
        height: 50,
    },
    btnGroup: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: 'rgba(190,190,190,0)',
        borderRadius: 10,
    },
    btnGroup1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: 'rgba(143,143,143,0)',
        borderRadius: 10,
    },
    text1: {
        fontWeight: 'bold',
        color: '#1a9bd5',
    },
    text2: {
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.52)',
    },
    title: {
        marginTop : 35,
        marginLeft : 20,
        fontSize: 30,
        color: '#353535',
        fontWeight: 700,
        fontFamily : 'system',
    },
    textDim : {
        marginTop : 35,
        marginLeft : 175,
        position: 'absolute',
        zIndex : 12,
        fontSize: 30,
        color: '#8f8f8f',
        fontWeight: 700,
        fontFamily : 'system',
    },
})
export default EditionsDesDeuxiemes;