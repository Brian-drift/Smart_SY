import React, {useState} from 'react';
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import SyllabusCards from "@/app/composants/syllabus_card";

const EcransDesDeuxiemes = () => {
    const [isModalOpen, setModalOpen] =useState(false);
    const [inputText, setInputText] = useState('');
    const [syllabusList, setSyllabusList] = useState([]);

    const handleAddSyllabus = () => {
        if (inputText.trim() !== '') {
            const newSyllabusData = { id: Date.now().toString(), text: inputText };
            setSyllabusList([...syllabusList, newSyllabusData]);
            setInputText('');
            setModalOpen(false);
        }
    };

    const renderItem = ({ item }) => (
        <SyllabusCards text={item.text} />
    );

    return (
        <SafeAreaView style={styles.container}>
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
                            veuillez entrez le nom du SYLLABUS
                        </Text>
                        <View style={styles.vInput}>
                            <TextInput
                                style={styles.textInp}
                                placeholder="Entrez du texte"
                                value={inputText}
                                onChangeText={text => setInputText(text)}
                            />
                        </View>
                        <View style={styles.princ}>
                            <TouchableOpacity style={styles.btnGroup} onPress={handleAddSyllabus}>
                                <Text style={styles.text1}>
                                    VALIDER
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
    renderItem: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        width: '40%',
        height: '35%',
        marginTop: 20,
        borderRadius: 18,
        borderWidth: .5,
        borderColor: '#e0e0e0',
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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: '75%',
        height: '40%',
        borderRadius: 18,
    },
    textInp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },
    vInput: {
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderWidth: 5,
        borderColor: '#2E75B6',
        borderRadius: 17,
        width: '90%',
        marginTop: 15,
    },
    txt: {
        marginTop: 15,
        fontSize: 40,
        color: 'black',
        textAlign: 'left',
        fontWeight: '900',
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
        backgroundColor: '#2E75B6',
        borderRadius: 10,
    },
    btnGroup1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: '#002B82',
        borderRadius: 10,
    },
    text1: {
        fontWeight: 'bold',
        color: '#002B82',
    },
    text2: {
        fontWeight: 'bold',
        color: '#2E75B6',
    }
})
export default EcransDesDeuxiemes;