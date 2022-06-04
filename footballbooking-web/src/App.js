import "./App.css";
import Header from "./components/Header/Header";
import "../src/assets/css/base.css";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home";
import Management from "./pages/Management";
import { Routes, Route } from "react-router-dom";
import PitchDetail from "./pages/PitchDetail";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import AddUser from "./components/AddUser/AddUser";
import ListUser from "./components/List-User/ListUser";
import MyPitchList from "./pages/MyPitchList";
import FormNewPitch from "./pages/FormNewPitch";

function App() {
  const [pitchId, setPitchId] = useState();

  function handlePitchDetail(pitchId) {
    setPitchId(pitchId);
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        {console.log("render")}
        <Route
          path="/"
          element={<Home onPitchDetail={handlePitchDetail} />}
        ></Route>
        <Route path={"/pitchdetail/:id"} element={<PitchDetail />}></Route>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/signup"} element={<SignupPage />}></Route>
        <Route path={"/bookingdetail"} element={<BookingDetailPage />}></Route>
        <Route path={"/pitchowner/booking"} element={<Management />}></Route>
        <Route path={"/pitchowner/pitchList"} element={<MyPitchList />}></Route>
        <Route
          path={"/pitchowner/createNewPitch"}
          element={<FormNewPitch />}
        ></Route>
        <Route path={"/list-user"} element={<ListUser />}></Route>
        <Route path={"/add-user"} element={<AddUser />}></Route>
      </Routes>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
