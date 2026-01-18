import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import NavbarSearch from "./NavbarSearch";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "@/Pages/Login/LoginModal";
import { LS } from "@/lib/SecureLocalStorage";
import { loginStateContext } from "@/Router/RouteContainer";
import { getSearchFilters } from "./service";
const NavBar = ({ logo }) => {
  const navigate = useNavigate();
  const count = useSelector((state) => state.data.count.count);
  const [navBarData, setnavBarData] = useState([]);
  useEffect(() => {
    getSearchFilters().then((res) => res && setnavBarData(res));
  }, []);

  const { setopen } = useContext(loginStateContext);
  return (
    <div className="navBar flex bg-white gap-1 border-[#d2d2d2] h-[60px] px-2 mb-2 sticky top-0 z-[999] items-center font-medium justify-between">
      <div
        className="h-full cursor-pointer px-3 py-1.5 shrink-0"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>
      <div className="navbar-content  max-w-[650px] grow ">
        <NavbarSearch />
        {navBarData.map((item) => (
          <HoverCard>
            <HoverCardTrigger className="h-8 cursor-pointer data-[state=open]:border-b-2 data-[state=open]:border-[var(--user-theme)] hidden md:flex items-center navbarText">
              <Link to={`/Category/${item._id}`} className="text-nowrap">
                {item.name}
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="flex gap-6 w-fit min-w-[200px] justify-around">
              {item.otherFilters.map((filter) => (
                <div className="category-context">
                  <span className="text-nowrap">{filter.name}</span>
                  {filter.subFilter.map(({ name, _id }) => (
                    <Link to={`/Category/${item._id},${_id}`} className="">
                      {name}
                    </Link>
                  ))}
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      <div className="flex gap-1 md:gap-3 items-center shrink-0">
        <button
          className="navbar-button"
          onClick={() =>
            LS.get("userId") ? navigate("userDetails/Orders") : setopen(true)
          }
        >
          <User size={16} strokeWidth={3} />
        </button>
        <button className="navbar-button">
          <Heart
            size={16}
            strokeWidth={3}
            onClick={() =>
              LS.get("userId")
                ? navigate("userDetails/Wishlist")
                : setopen(true)
            }
          />
        </button>
        <button
          className="navbar-button relative shopping-bag"
          data-count={count}
          onClick={() => navigate("/Cart")}
        >
          <ShoppingBag size={16} strokeWidth={3} />
        </button>
      </div>
      {/* <LoginModal open={open} setopen={setopen} /> */}
    </div>
  );
};

export default NavBar;
