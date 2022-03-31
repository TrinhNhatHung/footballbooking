import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Search from './components/Search/Search';
import Card from './components/Card/Card';
import '../src/assets/css/base.css';
import Pagination from './components/Paganation/Pagination';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-container'>
        <Sidebar />
        < div className="container mf-30 p-0" >
          <Search />
          <Card />
          <Card />
          <Card />
          <Card />
          <Pagination />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
