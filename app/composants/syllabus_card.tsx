import {View, StyleSheet, TouchableNativeFeedback, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function SyllabusCard( item) {

    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={navigation.navigate('pdfScreen')}>
            <View style={styles.card}>
                <Text  style={styles.title}>{item.title}</Text>
                <Text  style={styles.editeur}>{item.editeur}</Text>
                <Text  style={styles.classe}>{item.classe}</Text>
            </View>
        </TouchableNativeFeedback>

    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        bottom :35,
        width: '40%',
        height: 180,
        borderWidth: 5,
        borderRadius: 15,
        borderColor: 'rgba(255,255,255,0)',
        top : 3,
        margin: 20,
        // Ombres pour iOS
        shadowColor: '#000',
        shadowOffset : {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        // Ombre pour Android
        elevation: 10,
    },
    title : {
        textAlign: 'center',
        fontSize: 24,
        color: '#353535',
        fontWeight: 700,
        fontFamily : 'system',

    },
    editeur : {
        textAlign: 'left',
        fontSize: 12,
        color: '#8e8e8e',
        fontWeight: 400,
        fontFamily : 'system',
    },
    classe : {
        textAlign: 'left',
        fontSize: 14,
        color: '#8e8e8e',
        fontWeight: 400,
        fontFamily : 'system',
    },
});
