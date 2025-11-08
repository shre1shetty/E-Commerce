import CircularOption from "@/Components/CicularOption/CircularOption";
import Slider from "@/Components/Slider/Slider";
import React, { useEffect, useState } from "react";
import TopDiscount from "@/assets/TopDiscount.png";
import NewArrival from "@/assets/NewArrival.png";
import Traditional from "@/assets/Traditional.png";
import Shoe1 from "@/assets/shoe1.png";
import DividerWithText from "@/Components/DividerWithText/DividerWithText";
import HomeProductCard from "@/Components/ProductCard/HomeProductCard";
import { getLayout } from "./service";
import { convertToBase64toFile, getFileUrl } from "@/lib/utils";
import { LS } from "@/lib/SecureLocalStorage";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import NewCollection from "@/assets/NewCollection.png";
import ReactGA from "react-ga4";
import "./index.css";
import { ArrowUpRightIcon } from "lucide-react";
const HomePage = () => {
  const navigate = useNavigate();
  const [slides, setslides] = useState([]);
  const [category, setcategory] = useState([]);
  const [stickyPanel, setstickyPanel] = useState({
    text: "",
    url: "",
    position: "right",
  });
  const [topProduct, settopProduct] = useState([]);
  const [selectedVariant, setselectedVariant] = useState({
    field1: "",
    value1: "",
    field2: "",
    value2: "",
  });

  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    getLayout().then(({ headerElement, category, stickyPanel, topProduct }) => {
      console.log(topProduct);
      setslides(
        headerElement.rows.map(({ file, url }) => ({
          file,
          url,
        }))
      );
      setcategory(
        category.map((value) => ({
          ...value,
          image: getFileUrl(value.image),
        }))
      );
      setstickyPanel(stickyPanel);
      settopProduct(topProduct);
    });
  }, [location.pathname]);

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex gap-4 h-[500px]">
          <div className="w-3/4">
            <Slider slidesPerView={1} slides={slides} />
          </div>
          <div className="w-1/4">
            <img src={NewCollection} alt="" className="h-full" />
          </div>
        </div>
        <DividerWithText textColor={"orange"}>
          Top Sales On Top Products
        </DividerWithText>
        <div className=" ">
          <text className="text-2xl font-bold text-[#353434]">
            Our Category
          </text>
          <div className="flex gap-6 mt-4 h-[140px]">
            <CircularOption image={TopDiscount}>Top Discounts</CircularOption>
            {category.map(({ image, label, value }) => (
              <CircularOption
                image={image}
                onClick={() => navigate(`/Category/${value}`)}
              >
                {label}
              </CircularOption>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bento-1">
            <img src={NewArrival} alt="" className="" />
            <div className="transparent-overlay">
              <p className="overlay-header">
                New Arrivals <ArrowUpRightIcon />
              </p>
              <p className="overlay-text">
                {" "}
                Explore the latest trends and styles in our new arrivals
                collection.
              </p>
            </div>
          </div>
          <div className="">
            <text className="text-2xl font-bold text-[#353434]">
              Trendy Products
            </text>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {topProduct.map((product) => (
                <HomeProductCard
                  id={product._id}
                  image={Shoe1}
                  label={product.name}
                  price={parseInt(product.price)}
                  discountPrice={product.price}
                  filters={product.variantFields}
                  description={product.description}
                  variantValues={product.variantValues}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bg-gray-600 z-[999] bottom-[190px] right-0 h-[260px] flex items-center text-center">
        <p className="rotate-[-180deg]  text-white px-2 font-bold text-sm [writing-mode:vertical-rl] ">
          {stickyPanel.text}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
