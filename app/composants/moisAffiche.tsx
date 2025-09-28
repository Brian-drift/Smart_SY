import React, {useEffect, useState} from 'react';
import {Text} from "react-native";

function MoisAffiche() {
    const [monthName, setMonthName] = useState<string>("");
    const textStyle = {
        color :  'rgba(3,3,3,0.31)',
    };

    useEffect(() => {
        const date = new Date();
        const name : string = date.toLocaleDateString("fr-FR", {month : "long"});
        setMonthName(name);
    }, [])

    return (
        <Text style={[{
            marginHorizontal : 10,
            top : 37,
            fontWeight : 700,
            fontSize : 30,
        }, textStyle]}>
            {monthName}
        </Text>
    );
}

export default MoisAffiche;