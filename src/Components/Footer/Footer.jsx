import React from "react";
import "./index.css";
import { Facebook, Instagram, Youtube } from "lucide-react";
const Footer = ({ logo, footerDetails }) => {
  return (
    <div className="footer">
      <div className="">
        <img src={logo} alt="" className="h-[50px] w-[50px] md:h-14 md:w-14" />
        <div className="text-[8px] md:text-[9px] leading-none">
          © 2025 Shoes India Pvt. Ltd. All rights reserved.
        </div>
      </div>
      <div className="social-media">
        <a
          className="facebook"
          href={`https://www.facebook.com/${footerDetails.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook color="white" size={12} fill="white" />
        </a>
        <a
          className="ig"
          href={`https://www.instagram.com/${footerDetails.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram color="white" size={12} />
        </a>
        <a
          className="youtube"
          href={`https://youtube.com/${footerDetails.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube color="white" size={12} />
        </a>
      </div>
      <div className="flex gap-1.5 md:gap-5">
        <div className="">
          <div className="footer-label">Address</div>
          <div className="footer-text">{footerDetails.address}</div>
        </div>
        <div className="">
          <div className="footer-label">Contact Us</div>
          <div className="footer-text">{footerDetails.contact}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
