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
            fontWeight : 300,
            fontSize : 28,
        },]}>
            {dayName.substring(0, dayName.length - 1)}
            <Text style={[{ fontSize : 28}, dotStyle]}>{ dayName.slice( -1 )}/</Text>
        </Text>
    );
}

export default JoursAffiche;