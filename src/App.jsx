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
import MainSkeleton from "./Components/Skeleton/MainSkeleton";
function App() {
  ReactGA.initialize("G-D61EQSNRHJ", {
    gaOptions: {
      send_page_view: false,
    },
  });
  const [themeColor, setThemeColor] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    async function fetchTheme() {
      const res = await AxiosInstance("/Theme/getUserTheme");
      setThemeColor(res.data.themeColor);
    }
    fetchTheme();
  }, []);

  // 2. Apply theme before paint
  useLayoutEffect(() => {
    if (themeColor) {
      setloading(false);
      document.documentElement.style.setProperty("--user-theme", themeColor);
    } else {
      setloading(true);
    }
  }, [themeColor]);
  return (
    <AuthContextProvider>
      <ToastContainer />
      {loading ? <MainSkeleton /> : <RouteContainer />}
    </AuthContextProvider>
  );
}

export default App;
