import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveActivityForToday(activity) {


    function getToday() {
        return new Date().toISOString().split("T") [0];
    }

    try {
        const today = getToday();

        // Récupérer tout ce qui existe déjà
        const stored = await AsyncStorage.getItem("activities");
        const all = stored ? JSON.parse(stored) : {};

        // Si aucune activité aujourd'hui = crée la liste
        if (!all[today]) {
            all[today] = [];
        }

        // Ajouter l’activité du jour
        all[today].push(activity);

        // Sauvegarder
        await AsyncStorage.setItem("activities", JSON.stringify(all));

        console.log("Activité sauvegardée :", activity);

    } catch (err) {
        console.log("Erreur sauvegarde :", err);
    }
}
