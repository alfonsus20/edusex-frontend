import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Material from "./pages/Material";
import MaterialDetail from "./pages/MaterialDetail";
import Register from "./pages/Register";
import Topic from "./pages/Topic";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box minH="calc(100vh - 140px)">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/topic/:topicId/material" element={<Material />} />
          <Route path="/material/:materialId" element={<MaterialDetail />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
