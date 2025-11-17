import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@PresenceDates';

/**
 * Enregistre la présence du jour et retourne toutes les dates enregistrées de manière sécurisée.
 * @returns {Promise<string[]>} La liste mise à jour de toutes les dates (YYYY-MM-DD).
 */
export async function registerAndGetPresenceDates() {
    const today = new Date().toISOString().split('T')[0];
    let dates = [];

    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);

        // Assure que nous traitons uniquement des valeurs non nulles et valides.
        if (jsonValue !== null && jsonValue !== undefined) {
            try {
                // Tente de parser, sinon utilise un tableau vide
                dates = JSON.parse(jsonValue);
                if (!Array.isArray(dates)) {
                    dates = [];
                }
            } catch (e) {
                console.error("Erreur de parsing JSON des dates.", e);
                dates = [];
            }
        }

        // Ajoute la date d'aujourd'hui si elle n'est pas déjà présente
        if (!dates.includes(today)) {
            dates.push(today);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
        }

    } catch (e) {
        console.error("Erreur générale dans l'accès à AsyncStorage", e);
    }

    // Retourne TOUJOURS un tableau (même vide)
    return dates;
}