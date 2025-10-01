import React, {useEffect} from "react";
import {FlatList, View, StyleSheet, ActivityIndicator, Text, SafeAreaView} from "react-native";
import SyllabusCard from "@/app/composants/syllabus_card";
import {fetchCours2eme} from "@/app/composants/listeDesCours";

export default function EcransDesDeuxiemes() {
    const [cours, setCours] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchCours2eme()
            .then(data => {
                setCours(data)
            })
            .catch(e => alert("'Une erreur c'est produite lors du chargement des donneées"))
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={'black'} size="large"/>
                <Text style={{fontSize: 18, color: '#626262',}}> Bonjours, chargement des données</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                numColumns={2}
                data={cours}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <SyllabusCard title={item.title} editeur={item.editeur} classe={item.classe}/>)}
                contentContainerStyle={{padding: 10}}
            />
            <View style={{padding: 10, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.31)'}}>
                <Text style={{textAlign: "center", marginBottom: 20, fontWeight: 400,}}> Si le syllabus que vous
                    cherchez ne se trouve pas dans cette liste, nous vous prions de bien vouloirs contacter le
                    professeurs concernés par le cours pour qu'il veuille bien l'ajouter </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
