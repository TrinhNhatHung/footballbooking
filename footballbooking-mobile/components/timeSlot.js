import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'



const timeSlot = ({props}) => {
    const {time} = props
    return (
        <View style={styles.container}>
            <TouchableOpacity>
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
        width: 60,
        height: 30,
        paddingHorizontal: 10,
        marginLeft: 16,
        borderRadius: 5,
    }
})