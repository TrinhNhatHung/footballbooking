import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const datePicker = () => {
    const [date, setDate] = useState(moment());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        // const currentDate = selectedDate;
        // setShow(false);
        setShow(false);
        setDate(moment(selectedDate));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // const showTimepicker = () => {
    //     showMode('time');
    // };




    return (
        <View>
            <View style={styles.datePicker}>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text>{date.format('DD/MM/YYYY')}</Text>

                </TouchableOpacity>
            </View>
            {/* <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View> */}
            {/* <Text>selected: {date.toLocaleString()}</Text> */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode="date"

                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
}

export default datePicker

const styles = StyleSheet.create({
    datePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 100,
        height: 30,
        paddingHorizontal: 10,
        marginLeft: 16,
    }
})