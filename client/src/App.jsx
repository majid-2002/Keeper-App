import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Container from '@mui/material/Container';
// import Login from "./components/Login/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import CreateArea from "./components/CreateArea/CreateArea";
// import Register from "./components/Register/Register";

function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <CreateArea />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
