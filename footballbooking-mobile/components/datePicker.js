import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const datePicker = (props) => {
    const [date, setDate] = useState(moment());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(moment(selectedDate));
        props.parentCallback(moment(selectedDate).format('YYYY/MM/DD'));
        props.updateFreeTime(moment(selectedDate).format('YYYY/MM/DD'), props.pitchId, props.pitchTypeId)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View>
            <View style={styles.datePicker}>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text>{date.format('DD/MM/YYYY')}</Text>

                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={Date.now()}
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