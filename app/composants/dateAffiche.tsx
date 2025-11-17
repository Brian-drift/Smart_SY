import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";

function DateAffiche() {
    const [day, setDay] = useState(new Date().getDate());
    useEffect(() => {
        const date = new Date();
        setDay(date.getDate());
    }, [])

    return (
        <View>
            <Text style={[{
                fontWeight : 700,
                fontSize : 28,
                color :  'rgba(3,3,3,0.31)',
            }]}> {day}</Text>
        </View>
    );
}

export default DateAffiche;