import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity, FlatList, Button
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {registerAndGetPresenceDates} from "@/app/composants/storage";
import {FontAwesome} from "@expo/vector-icons";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import moment from "moment"; // Assurez-vous que le chemin est correct
import "moment/locale/fr"
import AsyncStorage from "@react-native-async-storage/async-storage";

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const { height } = Dimensions.get('window');

const AppCalendar = () => {

    const [totalMarkedDays, setTotalMarkedDays] = useState(0);
    const [markedDates, setMarkedDates] = useState({});
    const [loading, setLoading] = useState(true);
    const [feedbackMessage, setFeedbackMessage] = useState("Appuyez longuement sur un jour pour voir son statut.");

    const [day, setDay] = useState(new Date().getDate());
    const [monthName, setMonthName] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [dayName, setDayName] = useState<string>("");

    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    const [selectedDay, setSelectedDay] = useState<Date>();

    const [activities, setActivities] = useState([]);


    async function loadActivitiesForDate(date) {
        const stored = await AsyncStorage.getItem("activities");
        const all = stored ? JSON.parse(stored) : {};

        const loaded = all[date] || [];

        // 🔹 Assurer que habits existe pour chaque activité
        const safeActivities = loaded.map(act => ({
            ...act,
            habits: act.habits || (() => {
                const obj = {};
                for (let i = 1; i <= act.objectif; i++) obj[i] = false;
                return obj;
            })()
        }));

        setActivities(safeActivities);
    }


    function getCurrentHabitDay(createdAt) {
        const start = new Date(createdAt);
        const today = new Date();

        // enlever l’heure pour éviter les décalages
        start.setHours(0,0,0,0);
        today.setHours(0,0,0,0);

        const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));

        return diff + 1; // jour 1 = date de création
    }


    async function toggleDot(activityIndex, dayIndex) {
        const updated = [...activities];
        const act = updated[activityIndex];

        const currentDay = getCurrentHabitDay(act.createdAt);

        if (dayIndex != currentDay) {
            alert("Tu ne peux cocher que la case du jour !");
            return;
        }

        if (act.habits[dayIndex] === true) {
            alert("La case du jour est déjà cochée.");
            return;
        }

        // Cocher la case
        act.habits[dayIndex] = true;

        setActivities(updated);

        // 🔥 Fix : stocker dans la bonne DATE
        const stored = await AsyncStorage.getItem("activities");
        const all = stored ? JSON.parse(stored) : {};

        const activityDate = act.createdAt.split("T")[0];
        all[activityDate] = updated;

        await AsyncStorage.setItem("activities", JSON.stringify(all));
    }





    const openSheet = (day) => {
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        moment.locale('fr')
        setSelectedDay(moment(day.dateString).format('D MMMM YYYY'));

        // 'day' est un objet, 'day.dateString' est la clé 'YYYY-MM-DD'
        const dateString = day.dateString;

        // 1. VÉRIFICATION CLÉ : Regarde si la clé existe dans notre objet marqué
        const isDayMarked = !!markedDates[dateString];

        let message = "";

        if (isDayMarked) {
            // Le jour est marqué (Salut)
            message = `Activité dans l'App :`;
        } else {
            // Le jour n'est pas marqué (Rien)
            message = `Oops aucune activité n'a étais répertorié`;
        }
        setFeedbackMessage(message);

        const date = day.dateString;
        loadActivitiesForDate(date);
    };

    const closeSheet = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };


    useEffect(() => {

        const date = new Date();
        setDay(date.getDate());

        const name : string = date.toLocaleDateString("fr-FR", {month : "long",});
        const journame : string = date.toLocaleDateString("fr-FR", {weekday : "short",});
        setMonthName(name);
        setDayName(journame);

        const takeyear = date.getFullYear();
        setYear(takeyear)

        async function loadPresenceAndMarkCalendar() {
            setLoading(true);

            // 1. Récupère toutes les dates de présence
            const allPresenceDates = await registerAndGetPresenceDates();

            // 2. Calcule le compte total (longueur du tableau)
            setTotalMarkedDays(allPresenceDates.length);

            // 3. Construit l'objet marqué pour le calendrier
            const newMarkedDates = allPresenceDates.reduce((acc, date) => {
                acc[date] = {
                    marked: true,
                    dotColor: 'red' // Le point rouge 🔴
                };
                return acc;
            }, {}); // IMPORTANT : Initialisation avec un objet vide {}

            setMarkedDates(newMarkedDates);
            setLoading(false);
        }

        loadPresenceAndMarkCalendar();


        }, []); // S'exécute uniquement au montage initial de l'application



    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} color="#00adf5" />;
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>

                <View style={styles.container2}>
                    <View>
                        <Text style={{
                            fontWeight : 700,
                            fontSize : 28,
                            top : 30,
                            left : "8%",
                            color :  'rgba(3,3,3,0.31)',
                        }}>
                            {dayName}
                        </Text>

                        <Text style={[{
                            fontWeight : 700,
                            fontSize : 120,
                            color :  'rgba(3,3,3,0.66)',
                        }]}> {day}</Text>
                    </View>


                    <View style={styles.container3}>
                        <Text style={{
                            fontWeight : 500,
                            fontSize : 28,
                            left : "7%",
                            color :  'rgba(3,3,3,0.31)',
                        }}>
                            {monthName}
                        </Text>
                        <Text style={{
                            fontWeight : 700,
                            fontSize : 28,
                            color :  'rgba(3,3,3,0.66)',
                        }}>
                            {year}
                        </Text>
                    </View>

                    {visible && (
                        <TouchableWithoutFeedback onPress={closeSheet}>
                            <View style={styles.overlay}>
                                <Animated.View
                                    style={[
                                        styles.sheetContainer,
                                        { transform: [{ translateX: slideAnim }] },
                                    ]}>

                                    <View style={styles.viewSheetContainer}>
                                        <Text style={styles.titleSheetContainer}>Status</Text>
                                        <Text style={styles.dateSheetContainer}>{selectedDay}</Text>
                                    </View>
                                        <Text style={styles.conditionExample}>
                                            {feedbackMessage}
                                        </Text>

                                    {activities.length === 0 ? (
                                        <Text style={styles.noActivity}>Aucune activité pour cette date.</Text>
                                    ) : (

                                        <FlatList
                                            data={activities.filter(item => item && item.titre)} // On garde que les vraies activités
                                            keyExtractor={(item, index) => index.toString()}   // clé unique
                                            renderItem={({ item }) => (
                                                <View style={{ borderColor : '#e1e1e1', borderWidth : 1, borderRadius : 10 }}>
                                                    {activities.map((act, indexAct) => (
                                                        <View key={indexAct} >
                                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                                                {act.titre}
                                                            </Text>

                                                            <View
                                                                style={{
                                                                    flexDirection: "row",
                                                                    flexWrap: "wrap",
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                {Object.keys(act.habits).map((day, indexDay) => (
                                                                    <TouchableOpacity
                                                                        key={indexDay}
                                                                        onPress={() => toggleDot(indexAct, day)}
                                                                        style={{
                                                                            width: "14.28%", // 7 colonnes
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                            paddingVertical: 6
                                                                        }}
                                                                    >
                                                                        <Text style={{ fontSize: 22 }}>
                                                                            {act.habits[day] ? "●" : "○"}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                ))}
                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            ListEmptyComponent={() => (
                                                <Text style={{ fontStyle: "italic" }}>Aucune activité pour cette date.</Text>
                                            )}
                                        />

                                    )}

                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.totalCountText}>
                        <Text style={styles.countValue}>{totalMarkedDays}</Text> Jours passer à poursuivre mes objectifs
                    </Text>
                    <Calendar

                        renderArrow={(direction) => (
                            <View>
                                {direction === "left" ?
                                    <FontAwesome name={'arrow-circle-o-left'} color={"rgba(3,3,3,0.66)"} size={20} /> :
                                    <FontAwesome name={'arrow-circle-o-right'} color={"rgba(3,3,3,0.66)"} size={20} /> }
                            </View>
                        )}

                        headerStyle={{
                            backgroundColor : '#e5e5e5',
                            borderRadius : 15,
                        }}

                        onDayLongPress={openSheet}

                        markedDates={markedDates}
                        // Utilise le type de marquage 'simple' pour afficher le point (dot)
                        markingType={'dot'}
                        theme={{
                            todayTextColor: '#00adf5',
                            arrowColor: '#00adf5',
                            textDayHeaderFontWeight: 'bold',
                        }}
                    />
                    <Text style={styles.note}>
                        Les points rouges (🔴) indiquent les jours où tu etais présent pour tes objectifs.
                    </Text>
                </View>

            </View>
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center',},
    container2: {paddingTop : "30%", justifyContent: 'center',},
    container3: {flexDirection: 'row', justifyContent: 'space-between', marginBottom : 50, paddingHorizontal : 10},
    header: {position: 'absolute', top : 0, fontSize: 22, textAlign: 'center', left : 10, fontWeight: '600',},
    loading: {flex: 1, justifyContent: 'center',},
    note: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
        paddingHorizontal: 20,
    },
    overlay: {...StyleSheet.absoluteFillObject, justifyContent: "flex-start", zIndex: 10,},
    sheetContainer: {
        paddingHorizontal : 10,
        backgroundColor: "#fff",
        borderRadius : 15,
        maxHeight : height * 0.3035,
        minHeight : height * 0.3035,
        width : "50%",
        alignSelf : "flex-end",
        margin : 10,
        borderColor : '#000',
        borderWidth : 1,
    },
    titleSheetContainer: {
        fontSize : 18,
        fontWeight : 700,
        fontFamily : 'system',
        color: '#64da00'
    },
    dateSheetContainer: {
        fontSize : 12,
        fontWeight : 700,
        fontFamily : 'system',
        marginTop : 2,
        color : '#000000'
    },
    viewSheetContainer : {
        alignItems: 'center',
        borderBottomWidth : 1,
        borderColor : '#dedede',
        marginBottom : 10,
    },
    conditionExample: {
        alignSelf : 'center',
        textAlign : 'center',
        fontSize: 14,
        color: '#666',
    },
    totalCountText: {
        fontSize: 16,
        fontWeight : 300,
        color: '#333',
        marginBottom: 5,
        alignSelf : 'center',
    },
    countValue: {
        fontWeight: 500,
        color: 'red'
    },
    noActivity : {
        textAlign: 'center',
    }
});

export default AppCalendar;