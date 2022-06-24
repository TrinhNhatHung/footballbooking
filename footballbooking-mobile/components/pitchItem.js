import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, } from '@expo/vector-icons';

export default function pitchItem(props) {
    const { pitch, navigation } = props
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1 }} >
                <View style={{ margin: 5 }}>
                    <FontAwesome name="soccer-ball-o" size={24} color="green" />
                </View>
                <Text style={styles.pitchName}>{pitch.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }} >
                <View style={{ margin: 5 }}>
                    <Entypo name="location-pin" size={24} color="green" />
                </View>
                <Text style={styles.pitchAddress}>{pitch.address.number} - {pitch.address.street}, {pitch.address.commune}, {pitch.address.district}, {pitch.address.city}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: pitch.coverAvatarLink,
                    }}
                />
                <View style={styles.text}>

                    <Text style={styles.pitchDetailName}>Các loại sân</Text>
                    {pitch.detail.map(pitchDetail => (
                        <View style={styles.timePrice} key={pitchDetail.pitchTypeId}>
                            <Text style={styles.time}>{pitchDetail.pitchTypeName}</Text>
                            <Text style={styles.price}>{(pitchDetail.timeSlots)[0].cost}đ</Text>
                        </View>
                    ))}

                    <View style={styles.phone}>
                        <Text style={styles.phoneNumberTittle}>Số điện thoại</Text>
                        <Text style={styles.phoneNumber}>{pitch.owner.phone}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("PitchDetail", {
                    pitch: pitch,
                })}>
                <Text style={styles.textButton}>
                    Chi tiết
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 40,
        elevation: 10,
    },

    infoContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        width: '100%',
    },

    tinyLogo: {
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
        flex: 2,
        resizeMode: 'contain',
    },

    text: {
        flexDirection: 'column',
        marginRight: 10,
        flex: 3,
        paddingVertical: 10,
    },

    pitchName: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        paddingBottom: 5,
        marginLeft: 10,
        marginTop: 2,
    },

    pitchAddress: {
        width: '100%',
        flex: 2,
        paddingVertical: 5,
        lineHeight: 20,
        marginLeft: 10,
    },

    pitchDetailName: {
        fontSize: 15,
        fontWeight: 'bold',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        flex: 1,
    },

    timePrice: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 5,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },

    time: {
    },

    price: {
        marginLeft: 20
    },

    phone: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 5,
        justifyContent: 'space-between',
    },

    phoneNumberTittle: {

    },

    phoneNumber: {
        marginLeft: 20
    },

    button: {
        backgroundColor: '#c6c7c8',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flex: 2,
        borderRadius: 4,
    },
    
    textButton: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})