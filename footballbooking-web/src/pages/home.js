import React, { useEffect, useState } from 'react';
import pitchApi from '../api/pitchApi';
import Card from '../components/Card/Card';
import PropTypes from 'prop-types';
import Search from '../components/Search/Search';
import { Route, Routes } from 'react-router-dom';
import Pagination from '../components/Paganation/Pagination';
import Sidebar from '../components/Sidebar/Sidebar';

Home.propTypes = {
    // pitchs: PropTypes.array,
    // onPitchClick: PropTypes.func,
    onPitchDetail: PropTypes.func,
};

Home.defaultProps = {
    // pitchs: [],
    // onPitchClick: null,
    onPitchDetail: null
}

function Home(props) {

    const { onPitchDetail } = props

    const [pitchs, setPitchs] = useState([]);
    const [filter, setFilter] = useState({});

    function handleFilterSubmit(formValues) {
        setFilter(formValues)
        console.log("App: " + formValues.searchTerm)
    }

    function handlePitchClick(pitch) {
        if (onPitchDetail) {
            onPitchDetail(pitch.pitchId)
            console.log(pitch.pitchId + " :: ")
        }
        console.log(pitch.pitchId + " : ")
    }

    useEffect(() => {
        const fetchPitchsList = async () => {
            const response = await pitchApi.getAll();
            setPitchs(response.data)
        }
        fetchPitchsList();
    }, [filter])
    return (
        <div className='main-container'>
            <Sidebar />
            < div className="container mf-30 p-0" >
                <Search onFilterSubmit={handleFilterSubmit} />
                {pitchs.map(p => (
                    <Card key={p.pitchId} pitch={p} onPitchClick={handlePitchClick} />
                ))}
                {/* <Routes>
                    <Route path='/' element={<Home filter={filter} />}></Route>
                    <Route path='/pitchdetail' element={<PitchDetail />}></Route>
                </Routes> */}
                <Pagination />
            </div>
        </div>



    );
}

export default Home;