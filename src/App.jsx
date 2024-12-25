import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteContainer from "./Router/RouteContainer";
function App() {
  return (
    <>
      <ToastContainer />
      <RouteContainer />
    </>
  );
}

export default App;
