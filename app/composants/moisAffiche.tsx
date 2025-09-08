import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function MoisAffiche({isHeight}) {
    const [monthName, setMonthName] = useState<string>("");
    const textStyle = {
        color : isHeight ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0.32)',
    };

    useEffect(() => {
        const date = new Date();
        const name : string = date.toLocaleDateString("fr-FR", {month : "long"});
        setMonthName(name);
    }, [])

    return (
        <Text style={[{
            position : 'absolute',
            zIndex : 1,
            fontWeight : 900,
            bottom : '15%',
            left : '36%',
            fontSize : 26,
        }, textStyle]}>
            {monthName}
        </Text>
    );
}

export default MoisAffiche;