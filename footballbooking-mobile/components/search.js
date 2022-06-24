import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function search(props) {
    const [modalVisible, setmodalVisible] = useState(false)
    const [pitchTypeChecked, setpitchTypeChecked] = React.useState([
        { id: 1, pitchType: 'Sân 5', isChecked: false },
        { id: 2, pitchType: 'Sân 7', isChecked: false },
        { id: 3, pitchType: 'Sân 11', isChecked: false },
    ]);

    const [zoneChecked, setZoneChecked] = React.useState([
        { id: 1, zone: 'Hải Châu', isChecked: false },
        { id: 2, zone: 'Cẩm Lệ', isChecked: false },
        { id: 3, zone: 'Thanh Khê', isChecked: false },
        { id: 4, zone: 'Liên Chiểu', isChecked: false },
        { id: 5, zone: 'Ngũ Hành Sơn', isChecked: false },
        { id: 6, zone: 'Sơn Trà', isChecked: false },
        { id: 7, zone: 'Hòa Vang', isChecked: false },
        { id: 8, zone: 'Hoàng Sa', isChecked: false },
    ]);

    const handleChange = (array, id) => {
        let temp = array.map((item) => {
            if (id === item.id) {
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        return temp;
    };

    return (
        <View>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 75,
                    zIndex: 10,
                }}
                onPress={() => {
                    props.getSearchText(text);
                }}
            >
                <FontAwesome5 name="search-location" size={20} color="#C6C6C6" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 20,
                    zIndex: 10,
                }}
                onPress={() => {
                    setmodalVisible(true)
                }}
            >
                <Ionicons name="filter-outline" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                //value={text}
                placeholder="Nhập tên sân bóng"
                onChangeText={text => {
                    // onChangeText(text)
                    props.getSearchText(text);
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setmodalVisible(false)
                }
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.filterTittle}>
                            Chọn khu vực
                        </Text>
                        <FlatList
                            data={zoneChecked}
                            renderItem={({ item }) =>
                                <View>
                                    <Checkbox.Item
                                        label={item.zone}
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setZoneChecked(handleChange(zoneChecked, item.id))
                                        }}
                                        uncheckedColor='green'
                                        color='green'
                                        style={styles.checkboxItem}
                                    />

                                </View>
                            }
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={styles.filterTittle}>
                            Chọn loại sân
                        </Text>
                        <FlatList
                            data={pitchTypeChecked}
                            renderItem={({ item }) =>
                                <View>
                                    <Checkbox.Item
                                        label={item.pitchType}
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setpitchTypeChecked(handleChange(pitchTypeChecked, item.id))
                                        }}
                                        uncheckedColor='green'
                                        color='green'
                                        style={styles.checkboxItem}
                                    />

                                </View>
                            }
                            keyExtractor={(item) => item.id}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                (console.log(zoneChecked, pitchTypeChecked))
                                props.getSearchFilter(zoneChecked, pitchTypeChecked)
                                setmodalVisible(false)
                            }}>
                            <Text style={styles.textButton}>
                                Áp dụng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        height: 40,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 60,
        paddingHorizontal: 20,
        borderRadius: 4,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
    },

    modalView: {
        margin: 20,
        alignItems: 'flex-start',
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
        borderRadius: 0,
        paddingTop: 10,
        minHeight: '80%',
        minWidth: Dimensions.get('window').width*90/100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    filterTittle: {
        marginLeft: 5,
        fontWeight:'bold',
        fontSize: 20,
        color: '#C6C6C6'
    },

    checkboxItem: {
        justifyContent: 'center',
        width: Dimensions.get('window').width*90/100,
        height: 35,
        borderBottomWidth: 1,
    },

    button: {
        backgroundColor: '#28A745',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: 20,
        marginBottom: 10,
        flex: 1,
        borderRadius: 4,
    },
})