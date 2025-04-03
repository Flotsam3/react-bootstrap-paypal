import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import Payment from "./components/Payment";
import CompletePayment from "./pages/CompletePayment";
import CancelPayment from "./pages/CancelPayment";

function App() {
  return (
      <>
        <Router>
          <h1>PayPal Demo</h1>
          <Routes>
            <Route path="/" element={<Payment />}/>
            <Route path="/complete" element={<CompletePayment />}/>
            <Route path="/cancel" element={<CancelPayment />}/>
          </Routes>
        </Router>
      </>
  )
}

export default App
