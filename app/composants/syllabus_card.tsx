import React from "react";
import { View, Image, StyleSheet } from "react-native";

type Props = {
    id: string;
    imageUrl: string;
};

export default function SyllabusCard({ id, imageUrl }: Props) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
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
        borderRadius: 8,
        borderColor: '#ffffff',
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
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
});
