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
import {useRoute} from "@react-navigation/native";
import SyllabusCardProfesseurs from "@/app/composants/syllabusPourLesProfs";

const EditionsDesQuatriemes = () => {
    const [isModalOpen, setModalOpen] =useState(false);
    const [inputText, setInputText] = useState('');
    const [syllabusList, setSyllabusList] = useState([]);
    const route = useRoute();
    const {item} = route.params

    const handleAddSyllabus = () => {
        if (inputText.trim() !== '') {
            const newSyllabusData = { id: Date.now().toString(), text: inputText };
            setSyllabusList([...syllabusList, newSyllabusData]);
            setInputText('');
            setModalOpen(false);
        }
    };

    const renderItem = ({ item }) => (
        <SyllabusCardProfesseurs text={item.text} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Quatrièmes </Text>
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
        marginLeft : 190,
        position: 'absolute',
        zIndex : 12,
        fontSize: 30,
        color: '#8f8f8f',
        fontWeight: 700,
        fontFamily : 'system',
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
})
export default  EditionsDesQuatriemes;