import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Search from './components/Search/Search';
import Card from './components/Card/Card';
import '../src/assets/css/base.css';
import Pagination from './components/Paganation/Pagination';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import PitchDetail from './pages/PitchDetail';
import { useState } from 'react';

// Home.propTypes = {
//   pitch: PropTypes.string,
//   handlePitchDetail: PropTypes.func
// };

// Home.defaultProps = {
//   pitch: '0',
//   handlePitchDetail: null
// }

function App() {

  // const [filter, setFilter] = useState({});

  // function handleFilterSubmit(formValues) {
  //   setFilter(formValues)
  //   console.log("App: " + formValues.searchTerm)
  // }
  const [pitchId, setPitchId] = useState()

  function handlePitchDetail(pitchId) {
    setPitchId(pitchId)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        {console.log("render")}
        <Route path='/' element={<Home onPitchDetail={handlePitchDetail} />}></Route>
        <Route path={'/pitchdetail/:id'} element={<PitchDetail />}></Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
