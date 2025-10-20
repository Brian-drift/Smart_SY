import React from 'react';
import {Text, View, StyleSheet, TextInput} from "react-native";

function Faq(props) {
    return (
        <View style={[styles.container]}>
            <Text style={styles.title}>Foire Aux Questions</Text>
            <TextInput />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
        backgroundColor: '#f5f5f5',
        justifyContent : "center"
    },
    title: {
        position: 'absolute',
        top : "7%",
        left: '2%',
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.26)",
    },
})
export default Faq;