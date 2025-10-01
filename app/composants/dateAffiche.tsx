import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function DateAffiche() {
    const [day, setDay] = useState(new Date().getDate());
    useEffect(() => {
        const date = new Date();
        setDay(date.getDate());
    }, [])

    return (
        <Text style={[{
            top : 12,
            fontWeight : 700,
            fontSize : 38,
        }]}> {day} </Text>
    );
}

export default DateAffiche;