import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function GoalModal({ visible, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [vision, setVision] = useState("");
    const [minutes, setMinutes] = useState("");
    const [triggerType, setTriggerType] = useState("free"); // free | time | action
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleSave = () => {
        const newGoal = {
            id: Date.now().toString(),
            title,
            vision,
            minutesPerDay: Number(minutes),
            trigger: {
                type: triggerType,
                time: triggerType === "time" ? time.toISOString() : null,
            },
            progress: {}, // tu rempliras avec les jours cochés
        };

        onSave(newGoal);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>

                    <Text style={styles.title}>Créer un objectif</Text>

                    {/* OBJECTIF */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'objectif"
                        placeholderTextColor="#aaa"
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* VISION */}
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Vision (pourquoi cet objectif ?)"
                        placeholderTextColor="#aaa"
                        value={vision}
                        onChangeText={setVision}
                        multiline
                    />

                    {/* Minutes par jour */}
                    <TextInput
                        style={styles.input}
                        placeholder="Minutes par jour"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={minutes}
                        onChangeText={setMinutes}
                    />

                    {/* Déclencheurs */}
                    <Text style={styles.sectionTitle}>Déclencheur</Text>

                    <View style={styles.triggerRow}>
                        {["free", "time", "action"].map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.triggerButton,
                                    triggerType === type && styles.triggerActive
                                ]}
                                onPress={() => setTriggerType(type)}
                            >
                                <Text style={styles.triggerText}>
                                    {type === "free" && "Libre"}
                                    {type === "time" && "Heure"}
                                    {type === "action" && "Après une action"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sélecteur d'heure */}
                    {triggerType === "time" && (
                        <>
                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => setShowPicker(true)}
                            >
                                <Text style={styles.timeText}>
                                    {time.getHours()}:{time.getMinutes().toString().padStart(2, "0")}
                                </Text>
                            </TouchableOpacity>

                            {showPicker && (
                                <DateTimePicker
                                    value={time}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={(e, selectedTime) => {
                                        setShowPicker(false);
                                        if (selectedTime) setTime(selectedTime);
                                    }}
                                />
                            )}
                        </>
                    )}

                    {/* Boutons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                            <Text style={styles.saveText}>Créer</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        color: "#333",
    },
    textArea: {
        height: 100,
    },
    sectionTitle: {
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 6,
        fontSize: 16,
    },
    triggerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    triggerButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#aaa",
        alignItems: "center",
    },
    triggerActive: {
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
    },
    triggerText: {
        color: "black",
        fontWeight: "600",
    },
    timeButton: {
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 10,
        alignItems: "center",
    },
    timeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 15,
    },
    cancelBtn: {
        padding: 12,
        marginRight: 10,
    },
    saveBtn: {
        backgroundColor: "#4caf50",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    cancelText: {
        fontSize: 16,
        color: "#555",
    },
    saveText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});
