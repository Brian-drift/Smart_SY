import React from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import notifee, { RepeatFrequency, TriggerType, AndroidImportance } from '@notifee/react-native';

function Notifications(props) {

    async function scheduleDailyReminder() {
        // 1. Demander la permission (Requis sur iOS et Android 13+)
        await notifee.requestPermission();

        // 2. Créer un Canal (Requis pour Android)
        const channelId = await notifee.createChannel({
            id: 'daily_reminder',
            name: 'Rappels Quotidiens',
            importance: AndroidImportance.HIGH, // Niveau d'importance élevé
        });

        // 3. Définir l'heure souhaitée pour le rappel (ex: 9h00 du matin)
        const date = new Date(Date.now());
        date.setHours(9, 0, 0, 0); // Régler l'heure à 09:00:00

        // Si l'heure de 9h00 est déjà passée aujourd'hui, planifier pour 9h00 demain
        if (date.getTime() < Date.now()) {
            date.setDate(date.getDate() + 1);
        }

        // 4. Créer le Trigger pour la récurrence
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
            repeatFrequency: RepeatFrequency.DAILY, // La clé : répéter tous les jours
        };

        // 5. Créer et planifier la Notification
        await notifee.createTriggerNotification(
            {
                id: '12345', // ID unique pour pouvoir annuler ou modifier plus tard
                title: 'Heure de la Routine Matinale ☀️',
                body: "N'oubliez pas de faire votre tâche quotidienne !",
                android: {
                    channelId,
                    // Autres options Android...
                },
                ios: {
                    // Options iOS spécifiques...
                },
            },
            trigger,
        );

        console.log('Rappel quotidien planifié pour 9h00 !');
    }

// Appelez cette fonction au démarrage de votre application ou après une action utilisateur
// scheduleDailyReminder();
    return (
        <View style={styles.container}>
            <Text> SALUT !!!</Text>
            <Button title={'Notificaation'} onPress={scheduleDailyReminder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Notifications;