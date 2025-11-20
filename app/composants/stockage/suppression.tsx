import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearAllActivities() {
    try {
        await AsyncStorage.removeItem("activities");
        console.log("Toutes les activités et objectifs ont été supprimés !");
    } catch (err) {
        console.log("Erreur lors de la suppression :", err);
    }
}
