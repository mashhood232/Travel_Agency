import "./App.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Agency from "./components/Agency";
import Users from "./components/Users";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Users />} />
          <Route path="/agency" element={<Agency />} />
        </Routes>
      </Router>

      <Toaster /> {/* Toast notifications */}
    </div>
  );
}

export default App;
