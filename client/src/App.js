import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/register/Login";
import Signup from "./components/register/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Add from "./components/goods/Add";
import Sales from "./components/goods/Sales";
import Edit from "./components/goods/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/register" element={<Signup />} />
          <Route path="/api/dashboard" element={<Dashboard />} />
          <Route path="/api/new-product" element={<Add />} />
          <Route path="/api/edit/:id" element={<Edit />} />
          <Route path="/api/new-sales/:id" element={<Sales />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;