import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function PdfScreen() {
    return (
        <View style={styles.container}>
            <WebView
                source={{
                    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                }}
                style={{ flex: 1 }}
                startInLoadingState={true} // affiche un spinner le temps du chargement
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
