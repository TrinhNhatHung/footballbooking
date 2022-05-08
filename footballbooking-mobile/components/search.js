import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function search() {
    return (
        <View>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 8,
                right: 75,
                zIndex: 10,
            }}>
                <FontAwesome5 name="search-location" size={20} color="#505050" />
            </TouchableOpacity>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 8,
                right: 20,
                zIndex: 10,
            }}>
                <Ionicons name="filter-outline" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                //value={text}
                placeholder="Nhập tên sân bóng"

            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        height: 40,
        backgroundColor: 'white',
        //width: '100%',
        marginLeft: 30,
        marginRight: 60,
        paddingHorizontal: 20,
    }
})