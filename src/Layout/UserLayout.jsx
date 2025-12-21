import AppBreadcrumb from "@/Components/BreadCrumb/AppBreadCrumb";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <AppBreadcrumb />
      <Outlet />
    </>
  );
};

export default UserLayout;
