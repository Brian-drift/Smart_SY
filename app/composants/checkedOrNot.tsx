import {useState} from "react";
import {TouchableOpacity, Text} from "react-native";


export default function CheckedOrNot() {
    const [checked, setChecked] = useState(false);

    return (
        <TouchableOpacity onPress={() => setChecked(!checked)}>
            <Text style={{fontSize: 24, fontWeight: "bold"}}>{
                checked ? '●' : '○'
            }</Text>
        </TouchableOpacity>
    )
}