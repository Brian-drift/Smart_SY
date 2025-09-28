import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChoixDesClasses() {
    const navigation = useNavigation();

    const route = useRoute();
    const { item } = route.params;


    const handleReset = async() => {
        try {
            await AsyncStorage.clear();
            navigation.navigate("ChoixRole");
        } catch (error) {
            console.error(" erreur lors des l'effacement des donnèes",error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textPricipale}>{item.title}</Text>
            <Text style={styles.textSecondaire}> choisissez la classe dans laquelle vous désirez faire le partages des documents</Text>
            <View  style={styles.classesBox}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editions_des_premieres', {item})}>
                        <Text style={styles.textIcon}>
                            1
                        </Text>
                        <Text  style={styles.textHum}>
                            Hum
                        </Text>
                        <Text  style={styles.textDim}>
                            {item.diminutif}
                        </Text>
                        <Text  style={styles.textTitle}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editions_des_troisiemes', {item})}>
                        <Text style={styles.textIcon}>
                            3
                        </Text>
                        <Text  style={styles.textHum}>
                            Hum
                        </Text>
                        <Text  style={styles.textDim}>
                            {item.diminutif}
                        </Text>
                        <Text  style={styles.textTitle}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editions_des_deuxiemes', {item})}>
                        <Text style={styles.textIcon}>
                            2
                        </Text>
                        <Text  style={styles.textHum}>
                            Hum
                        </Text>
                        <Text  style={styles.textDim}>
                            {item.diminutif}
                        </Text>
                        <Text  style={styles.textTitle}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editions_des_quatriemes', {item})}>
                    <Text style={styles.textIcon}>
                            4
                        </Text>
                        <Text  style={styles.textHum}>
                            Hum
                        </Text>
                        <Text  style={styles.textDim}>
                            {item.diminutif}
                        </Text>
                        <Text  style={styles.textTitle}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.textDessous}> Notez qu'il y a qu'en quatrième que vous pourrait voir à quoi ressemblerons les syllabus une fois la base de données términer </Text>
            <TouchableOpacity style={styles.restartButton} onPress={() => handleReset()}><Text style={{color : 'white', fontWeight : '500'}}> Tout révoir </Text></TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create ({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnimation: {
        flex: 0.7, // Prend la même proportion que votre ancienne image
        justifyContent: 'center',
        alignSelf: 'center', // Centre l'animation horizontalement
    },
    header: {
        fontSize:16
    },
    classesBox : {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#353535',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(52,52,52)',
        height: 140,
        width: 140,
        margin: 10,
        borderRadius: 30,
        // Ombres pour iOS
        shadowColor: '#000',
        shadowOffset : {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        // Ombre pour Android
        elevation: 9,
    },
    textIcon : {
        top : 5,
        left : 10,
        position: 'absolute',
        zIndex : 10,
        fontSize: 40,
        color: 'white',
        fontWeight: 700,
        fontFamily : 'system',
    },
    textHum : {
        top : 16,
        left : 35,
        position: 'absolute',
        zIndex : 10,
        fontSize: 30,
        color: '#7a7a7a',
        fontWeight: 700,
        fontFamily : 'system',
    },
    textDim : {
        top : 50,
        left : 10,
        position: 'absolute',
        zIndex : 12,
        fontSize: 30,
        color: '#b7b7b7',
        fontWeight: 700,
        fontFamily : 'system',
    },
    textTitle : {
        top : 100,
        left : 13,
        position: 'absolute',
        zIndex : 10,
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 500,
        fontFamily : 'system',
    },
    textPricipale : {
        top : 200,
        left : 20,
        position: 'absolute',
        zIndex : 12,
        fontSize: 30,
        color: '#353535',
        fontWeight: 700,
        fontFamily : 'system',
        borderBottomWidth : 1,
        borderBottomColor : '#353535',
    },
    textSecondaire : {
        top : 250,
        textAlign : 'center',
        position: 'absolute',
        zIndex : 12,
        fontSize: 15,
        color: 'rgba(53,53,53,0.75)',
        fontWeight: 400,
        fontFamily : 'system',
    },
    textDessous : {
        marginHorizontal : 10,
        bottom : 130,
        textAlign : 'center',
        position: 'absolute',
        zIndex : 12,
        fontSize: 15,
        color: 'rgba(53,53,53,0.75)',
        fontWeight: 400,
        fontFamily : 'system',
    },
    restartButton : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53,53,53,0.75)',
        height : 50,
        width : 150,
        borderRadius : 20,
        bottom : -230
    }
})

export default ChoixDesClasses;