import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteContainer from "./Router/RouteContainer";
// import "primereact/resources/themes/lara-light-blue/theme.css"; // Example theme

import "primereact/resources/primereact.min.css"; //core css
function App() {
  return (
    <>
      <ToastContainer />
      <RouteContainer />
    </>
  );
}

export default App;
