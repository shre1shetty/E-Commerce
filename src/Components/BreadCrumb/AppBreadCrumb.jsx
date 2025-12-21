import { matchRoute } from "@/lib/utils";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbConfig = [
  { path: "/", label: "Home" },
  { path: "/Category/:id", label: "Category" },
  { path: "/Search", label: "Search" },
  { path: "/Product/:id", label: "Product" },
  { path: "/Cart", label: "Cart" },
  { path: "/userDetails", label: "My Account" },
  { path: "/userDetails/Orders", label: "Orders" },
  { path: "/userDetails/Addresses", label: "Addresses" },
  { path: "/userDetails/Wishlist", label: "Wishlist" },
];

const AppBreadcrumb = () => {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);

  const items = parts
    .map((_, index) => {
      const url = `/${parts.slice(0, index + 1).join("/")}`;

      const matched = breadcrumbConfig.find((route) =>
        matchRoute(route.path, url)
      );

      if (!matched) return null;

      const isLast = index === parts.length - 1;

      return {
        title: isLast ? matched.label : <Link to={url}>{matched.label}</Link>,
      };
    })
    .filter(Boolean);

  // ✅ Always add Home ONCE at the beginning
  return (
    <Breadcrumb
      style={{ marginBottom: 16 }}
      items={[{ title: <Link to="/">Home</Link> }, ...items]}
    />
  );
};

export default AppBreadcrumb;
