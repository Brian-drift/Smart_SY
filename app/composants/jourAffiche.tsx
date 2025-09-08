import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function JoursAffiche({isHeight}) {
    const [dayName, setDayName] = useState<string>("");
    const textStyle = {
        color : isHeight ? 'rgba(255,255,255,0)' : '#000000',
    };
    const dotStyle = {
        color : isHeight ? 'rgba(255,255,255,0)' : '#ff8000',
    };

    useEffect(() => {
        const date = new Date();
        const name : string = date.toLocaleDateString("fr-FR", {weekday : "short"});
        setDayName(name);
    }, [])

    return (
        <Text style={[{
            position : 'absolute',
            zIndex : 1,
            fontWeight : 900,
            bottom : '11%',
            left : '5%',
            fontSize : 52,
        }, textStyle]}>
            {dayName.substring(0, dayName.length - 1)}
            <Text style={[{ fontSize : 70}, dotStyle]}>{ dayName.slice( -1 )}</Text>
        </Text>
    );
}

export default JoursAffiche;