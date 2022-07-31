import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/register/Login";
import Signup from "./components/register/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Add from "./components/goods/Add";
import Sales from "./components/goods/Sales";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-product" element={<Add />} />
          <Route path="/new-sales" element={<Sales />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;