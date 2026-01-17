import AppBreadcrumb from "@/Components/BreadCrumb/AppBreadCrumb";
import { getFooter, getLogo } from "@/Router/service";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/NavBar";

const UserLayout = () => {
  const [logo, setlogo] = useState(null);
  const [footerDetails, setfooterDetails] = useState({});

  useEffect(() => {
    getLogo().then(({ logo }) => {
      setlogo(`${import.meta.env.VITE_BASE_URL}/file?id=${logo}`);
    });
    getFooter().then(({ footerDetails }) => setfooterDetails(footerDetails));
  }, []);
  return (
    <>
      <NavBar logo={logo} />
      <div className={"grow"}>
        <div className={"px-2 md:px-[19px] h-full"}>
          <AppBreadcrumb />
          <Outlet />
        </div>
      </div>
      <Footer logo={logo} footerDetails={footerDetails} />
    </>
  );
};

export default UserLayout;
