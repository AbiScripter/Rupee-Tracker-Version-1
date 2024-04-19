import { useSelector } from "react-redux";
import Income from "./components/Income";
import Expense from "./components/Expense";
import DataTable from "./components/Tables";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>

    //!OLD ONE
    // const currAccount = useSelector((state) => state.account);
    // <div className="App">
    //   <h2>Finance Tracker</h2>
    //   <h3>Current Total : {currAccount.currBalance}</h3>
    //   <div>
    //     <Income />
    //     <Expense />
    //     <DataTable />
    //   </div>
    // </div>
  );
}

export const genRandomKey = () => {
  return Math.floor(Math.random() * 100000);
};

export default App;
