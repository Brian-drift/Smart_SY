import React, { useRef} from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated} from "react-native";
import {useNavigation} from "@react-navigation/native";

function GalaxieItems({item}) {

    const navigation = useNavigation()

    const scaleAnim = useRef(new Animated.Value(0.1)).current;

    const runSpring = () => {
        Animated.spring(scaleAnim, {
            toValue : 1,
            friction : 5,
            tension : 100,
            useNativeDriver : true,
        }).start();
        navigation.navigate('EleveDashboard',)
    }
    return (
        <TouchableOpacity style={styles.container} onPress={runSpring}>
            <Animated.View style={[styles.item, {transform : [{ scale: scaleAnim }]}]}>
                <Text style={styles.title}>{item.title}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffdfd',
        borderWidth : 1,
        margin : 10,
        borderRadius : 13,
        // Ombres pour iOS
        shadowColor: '#000',
        shadowOffset : {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        // Ombre pour Android
        elevation: 9,
    },
    item : {
        padding : 16,
        fontSize : 16,
    },
    title : {
        fontSize : 16,
        fontWeight : '500',
        color: 'rgba(0,0,0,0.76)',
    },
})
export default GalaxieItems;