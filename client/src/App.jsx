import Dishes from "./components/Dishes";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div>
      <Header />
      <Dishes />
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose="3000"
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
