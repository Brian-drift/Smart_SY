import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function MoisAffiche() {
    const [monthName, setMonthName] = useState<string>("");
    const textStyle = {
        color :  'rgba(3,3,3,0.31)',
    };

    useEffect(() => {
        const date = new Date();
        const name : string = date.toLocaleDateString("fr-FR", {month : "short"});
        setMonthName(name);
    }, [])

    return (
        <Text style={[{
            fontWeight : 400,
            fontSize : 28,
        }, textStyle]}>
            /{monthName}
        </Text>
    );
}

export default MoisAffiche;