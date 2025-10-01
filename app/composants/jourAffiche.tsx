import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function JoursAffiche() {
    const [dayName, setDayName] = useState<string>("");

    const dotStyle = {
        color : '#FD7F00FF',
    };

    useEffect(() => {
        const date = new Date();
        const name : string = date.toLocaleDateString("fr-FR", {weekday : "short"});
        setDayName(name);
    }, [])

    return (
        <Text style={[{
            top : 0,
            fontWeight : 700,
            fontSize : 40,
        },]}>
            {dayName.substring(0, dayName.length - 1)}
            <Text style={[{ fontSize : 50}, dotStyle]}>{ dayName.slice( -1 )}</Text>
        </Text>
    );
}

export default JoursAffiche;