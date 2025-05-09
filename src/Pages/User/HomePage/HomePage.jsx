import CircularOption from "@/Components/CicularOption/CircularOption";
import Slider from "@/Components/Slider/Slider";
import React, { useEffect, useState } from "react";
import TopDiscount from "@/assets/TopDiscount.png";
import ForMen from "@/assets/ForMen.png";
import Traditional from "@/assets/Traditional.png";
import Shoe1 from "@/assets/shoe1.png";
import Shoe2 from "@/assets/yellowShoes.png";
import Shoe3 from "@/assets/redShoe.png";
import DividerWithText from "@/Components/DividerWithText/DividerWithText";
import HomeProductCard from "@/Components/ProductCard/HomeProductCard";
import { getLayout } from "./service";
import { convertToBase64toFile, getFileUrl } from "@/lib/utils";
import { LS } from "@/lib/SecureLocalStorage";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
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
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="mb-8 flex flex-col gap-4">
        <div className=" ">
          <Slider slidesPerView={slides.length > 3 ? 3 : 1} slides={slides} />
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
            {/* <CircularOption image={ForMen}>Mens</CircularOption>
            <CircularOption image={Traditional}>Traditional</CircularOption> */}
          </div>
        </div>

        <div className="">
          <text className="text-2xl font-bold text-[#353434]">
            Trendy Products
          </text>
          <div className="grid grid-cols-5 gap-6 mt-4">
            {topProduct.map((product) => (
              <HomeProductCard
                id={product._id}
                image={Shoe1}
                label={product.name}
                price={parseInt(product.price) + 1000}
                discountPrice={product.price}
                filters={product.variantFields}
                description={product.description}
                variantValues={product.variantValues}
              />
            ))}
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
