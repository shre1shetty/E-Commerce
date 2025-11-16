import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteContainer from "./Router/RouteContainer";
import ReactGA from "react-ga4";
// import "primereact/resources/themes/lara-light-blue/theme.css"; // Example theme

import "primereact/resources/primereact.min.css"; //core css
import AuthContextProvider from "./context/AuthContextProvider";
import { useEffect, useLayoutEffect, useState } from "react";
import { AxiosInstance } from "./lib/AxiosInstance";
function App() {
  ReactGA.initialize("G-D61EQSNRHJ");
  const [themeColor, setThemeColor] = useState(null);
  useEffect(() => {
    async function fetchTheme() {
      const res = await AxiosInstance("/Theme/getUserTheme");
      setThemeColor(res.data.themeColor);
    }
    fetchTheme();
  }, []);

  // 2. Apply theme before paint
  useLayoutEffect(() => {
    console.log(themeColor);
    if (themeColor) {
      document.documentElement.style.setProperty("--user-theme", themeColor);
    }
  }, [themeColor]);
  return (
    <AuthContextProvider>
      <ToastContainer />
      <RouteContainer />
    </AuthContextProvider>
  );
}

export default App;
