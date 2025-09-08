import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function DateAffiche({isHeight}) {
    const [day, setDay] = useState(new Date().getDate());
    const textStyle = {
        color : isHeight ? 'rgba(255,255,255,0)' : '#000000',
    };
    useEffect(() => {
        const date = new Date();
        setDay(date.getDate());
    }, [])

    return (
        <Text style={[{
            position : 'absolute',
            zIndex : 1,
            fontWeight : 900,
            bottom : '11%',
            right : '5%',
            fontSize : 52,
        }, textStyle]}> {day} </Text>
    );
}

export default DateAffiche;