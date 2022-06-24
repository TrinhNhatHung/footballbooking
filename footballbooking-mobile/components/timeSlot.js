import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const timeSlot = (props) => {
    const { time, parentCallback } = props
    return (
        <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        parentCallback(time);
                    }}>
                    <Text>{time}</Text>
                </TouchableOpacity>
        </View>
    )
}

export default timeSlot

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 58,
        height: 30,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 5,
    }
})