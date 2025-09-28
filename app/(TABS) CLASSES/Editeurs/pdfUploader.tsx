import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function PDFUploader() {
    const [pdfName, setPdfName] = useState<string | null>(null);

    const pickPDF = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            if (result.assets && result.assets.length > 0) {
                setPdfName(result.assets[0].name); // Nom du PDF
            }
        } catch (error) {
            console.log("Erreur lors du choix du fichier :", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="📂 Upload Syllabus" onPress={pickPDF} />

            {pdfName && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>✅ PDF sélectionné : {pdfName}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 40 ,
        justifyContent: "center",
        alignItems: "center",},
    webview: { flex: 1, marginTop: 10 },
    statusContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#e0ffe0",
        borderRadius: 5,
    },
    statusText: {
        textAlign: "center",
        color: "#28a745",
        fontSize: 16,
    },
});
