import React, { useEffect, useState } from "react";
import Image from "../../assets/NavbarLogo.png";
import "./index.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NavbarSearch from "./NavbarSearch";
import { Heart, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
const NavBar = ({ logo }) => {
  const navigate = useNavigate();
  return (
    <div className="navBar flex bg-white border border-[#d2d2d2] h-[60px] px-2 mb-2 sticky top-0 z-[999] items-center font-medium justify-between">
      <div className="h-full">
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>
      <div className="flex gap-4 h-full items-center">
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer data-[state=open]:border-b-2 data-[state=open]:border-orange-500 h-full flex items-center navbarText">
            Men
          </HoverCardTrigger>
          <HoverCardContent className="grid grid-cols-4 gap-6 w-fit">
            <div className="category-context">
              <span className="">Traditional</span>
              <a href="" className="">
                Kolhapuri
              </a>
              <a href="" className="">
                Pathani Sandal
              </a>
              <a href="" className="">
                Juttis
              </a>
            </div>
            <div className="category-context">
              <span className="">Casual</span>
              <a href="" className="">
                Loafers
              </a>
              <a href="" className="">
                Sleepers
              </a>
              <a href="" className="">
                Sandals
              </a>
            </div>
            <div className="category-context">
              <span className="">Sports</span>
              <a href="" className="">
                Running Shoes
              </a>
              <a href="" className="">
                Casual Sports Shoees
              </a>
              <a href="" className="">
                Spikes Shoes
              </a>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer data-[state=open]:border-b-2 data-[state=open]:border-orange-500 h-full flex items-center navbarText">
            Women
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer data-[state=open]:border-b-2 data-[state=open]:border-orange-500 h-full flex items-center navbarText">
            Sports
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer data-[state=open]:border-b-2 data-[state=open]:border-orange-500 h-full flex items-center navbarText">
            Casual
          </HoverCardTrigger>
          <HoverCardContent>
            The React Framework – created and maintained by @vercel.
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex gap-3 items-center">
        <NavbarSearch />
        <User
          className="cursor-pointer"
          type="button"
          onClick={() => navigate("/")}
        />
        <Heart />
        <ShoppingBag />
      </div>
    </div>
  );
};

export default NavBar;
