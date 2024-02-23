import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import CustomFooter from "./components/Footer";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Register from "./components/Register";
import Detail from "./components/Detail";
import CreateEvent from "./components/CreateEvent";
import AnimatedAlert from "./components/AnimatedAlert";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { setUser } from "./redux/features/userSlice";

function Content() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser");
    const activeUser = JSON.parse(storedUser);
    dispatch(setUser(activeUser));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-event" element={<CreateEvent />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Container className="position-relative" id="main-container">
          <AnimatedAlert />
          <Content />
        </Container>
        <CustomFooter />
      </Router>
    </Provider>
  );
}

export default App;
