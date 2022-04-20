import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";
import "./ReactDayPicker.css"


ReactDayPicker.propTypes = {
    onSubmitFind: PropTypes.func
};

ReactDayPicker.defaultProps = {
    onSubmitFind: null
}

function ReactDayPicker(props) {
    const [date, setDate] = useState(new Date())
    const { onSubmitFind } = props
    function handleChange(date) {
        setDate(date)
    }
    function onFormSubmit(e) {
        e.preventDefault();
        onSubmitFind(date)

    }
    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <DatePicker
                    selected={date}
                    onChange={handleChange}
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                />
            </div>

            <button type="button" className="btn btn-info btn-find" onClick={onFormSubmit}>Tìm</button>
        </form >
    );
}

export default ReactDayPicker;
// class ReactDayPicker extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             startDate: new Date()
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.onFormSubmit = this.onFormSubmit.bind(this);
//     }
//     handleChange(date) {
//         this.setState({
//             startDate: date
//         })
//     }
//     onFormSubmit(e) {
//         e.preventDefault();
//         console.log(this.state.startDate)
//     }

//     render() {
//         return (
//             <form onSubmit={this.onFormSubmit}>
//                 <div className="form-group">
//                     <DatePicker
//                         selected={this.state.startDate}
//                         onChange={this.handleChange}
//                         name="startDate"
//                         dateFormat="MM/dd/yyyy"
//                     />
//                 </div>

//                 <button type="button" class="btn btn-info" onClick={this.onFormSubmit}>Tìm</button>


//             </form>
//         );
//     }

// }


// export default ReactDayPicker;