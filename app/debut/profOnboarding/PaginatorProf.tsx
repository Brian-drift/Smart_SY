// Fichier du composant Paginator (Paginator.js ou Paginator.tsx)

import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions  } from 'react-native';

function PaginatorProfs({ data, scrollX }) { // Assurez-vous que scrollX est bien déstructuré ici
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }
    const {width} = useWindowDimensions()

    return (
        <View
            style={{
                flexDirection: 'row',
                height: 63,
                justifyContent: 'center',
                alignItems: 'center',
            }}>{data.map((item: any, index: number) => {
            const inRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width
            ];
            // C'est cette ligne qui a besoin que scrollX soit un Animated.Value valide.
            const dotWidth = scrollX.interpolate({
                inputRange: inRange,
                outputRange: [styles.dot.width, styles.dot.width * 3, styles.dot.width], // Ex: [10, 30, 10]
                extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
                inputRange: inRange,
                outputRange: [0.3, 1,0.3],
                extrapolate: 'clamp',
            })

            return (
                <Animated.View
                    key={index.toString()}
                    style={[
                        styles.dot,
                        {width: dotWidth, opacity}
                    ]}
                />
            );
        })}</View>
    );
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        backgroundColor: "#323232",
        marginHorizontal: 8,
        borderRadius: 5,
        width: 10,
    }
});

export default PaginatorProfs;