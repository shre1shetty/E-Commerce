import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteContainer from "./Router/RouteContainer";
import ReactGA from "react-ga4";
// import "primereact/resources/themes/lara-light-blue/theme.css"; // Example theme

import "primereact/resources/primereact.min.css"; //core css
import AuthContextProvider from "./context/AuthContextProvider";
function App() {
  ReactGA.initialize("G-D61EQSNRHJ");
  return (
    <AuthContextProvider>
      <ToastContainer />
      <RouteContainer />
    </AuthContextProvider>
  );
}

export default App;
