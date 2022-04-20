import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardDetail from '../components/CardDetail/CardDetail';
import ReactDayPicker from '../components/DayPicker/ReactDayPicker';
import pitchApi from '../api/pitchApi';
import { Route, useParams } from 'react-router-dom';
import "./pitchDetail.css"

PitchDetail.propTypes = {

};

function PitchDetail(props) {
    const [pitchDetail, setPitchDetail] = useState({})
    console.log("reload")
    let { id } = useParams()
    useEffect(() => {
        const fetchPitchDetail = async () => {

            console.log("HAHA: " + id)
            const pitchId = id
            console.log("id: " + pitchId)
            const response = await pitchApi.get(pitchId)
            setPitchDetail(response.data)
            console.log("===============" + response.data)
        }
        fetchPitchDetail();
        console.log("pitch detail")

    }, [])
    return (
        <div className='main-container'>
            < div className="container mf-30 p-0" >
                <CardDetail pitchDetail={pitchDetail} />
            </div>


        </div>
    );
}

export default PitchDetail;