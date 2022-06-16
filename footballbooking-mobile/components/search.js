import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import Constants from 'expo-constants'

export default function search(props) {

    // const [text, onChangeText] = React.useState('');
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

    // const addressArray = props.pitchs.data.map(item => {
    //     return item.address.street;
    // })
    // const uniqueAddressArray = addressArray.filter((item, index) => {   
    //    return addressArray.indexOf(item) === index
    // });

    // const pitchTypeArray = ['Sân 5', 'Sân 7', 'Sân 11']
    // console.log(uniqueAddressArray)

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
                // onBackButtonPress ={() => {
                //   setHourStart({
                //     // hourStart: hourStart.hourStart,
                //     // miniPitchId: hourStart.miniPitchId,
                //     modalVisible: !hourStart.modalVisible
                //   })
                //   console.log('Back')
                // // }}
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
                            // contentContainerStyle={styles.modalView}
                            // data={searchPitchs.searching ? searchPitchs.data : pitchs.data}
                            data={zoneChecked}
                            renderItem={({ item }) =>
                                <View style={styles.checkboxItem}>
                                    {/* <Text>Hello</Text> */}
                                    {/* <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            /> */}
                                    <Checkbox.Item
                                        label={item.zone}
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setZoneChecked(handleChange(zoneChecked, item.id))
                                        }}
                                        uncheckedColor='green'
                                        color='green'
                                    />

                                </View>
                            }
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={styles.filterTittle}>
                            Chọn loại sân
                        </Text>
                        <FlatList
                            // contentContainerStyle={styles.modalView}
                            // data={searchPitchs.searching ? searchPitchs.data : pitchs.data}
                            data={pitchTypeChecked}
                            renderItem={({ item }) =>
                                <View style={styles.checkboxItem}>
                                    {/* <Text>Hello</Text> */}
                                    {/* <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            /> */}
                                    <Checkbox.Item
                                        label={item.pitchType}
                                        // style={{
                                        //     flexDirection: 'row',
                                        //     // flex: 1,
                                        //     paddingVertical: 5,
                                        //     justifyContent: 'space-between',
                                        // }}
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setpitchTypeChecked(handleChange(pitchTypeChecked, item.id))
                                        }}
                                        uncheckedColor='green'
                                        color='green'
                                    // position='leading'

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
        //width: '100%',
        marginLeft: 30,
        marginRight: 60,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "flex-start",
        // marginTop: 0
    },
    modalView: {
        margin: 20,
        alignItems: 'flex-start',
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
        borderRadius: 0,
        paddingTop: 10,
        minHeight: '80%',
        minWidth: '80%',
        // alignItems: "center",
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
        // alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        width: 250,
        height: 30,
        borderBottomWidth: 1,
        // paddingRight: 10,
        // marginLeft: 16,
        // marginBottom: 10,
        // backgroundColor: '#368340',
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