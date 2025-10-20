import React from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function Personalisation(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Personalisation
            </Text>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Ionicons name={"image-outline"} size={23} color="#5e5e5e" />
                <Text style={styles.uploade}>
                    Uploader une image
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.information}>
                <Ionicons name={"help-circle-outline"} size={23} color="#5e5e5e" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent : "center",
        alignItems: "center",
    },
    title: {
        position: 'absolute',
        left: '2%',
        top : '7%',
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.26)",
    },
    button: {
        alignItems: 'center',
        flexDirection : "row",
        padding: 15,
        borderWidth: 1,
        borderColor: '#444444',
        borderRadius: 8,
        width : '50%'
    },
    uploade: {
        fontSize: 16,
        fontWeight: "400",
        marginHorizontal : 10
    },
    information: {
        position: 'absolute',
        right: '2%',
        top: '4.5%',
        margin: 20,
    }
})

export default Personalisation;