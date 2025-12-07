import CircularOption from "@/Components/CicularOption/CircularOption";
import Slider from "@/Components/Slider/Slider";
import React, { useEffect, useState } from "react";
import TopDiscount from "@/assets/TopDiscount.png";
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
import { groupBy } from "lodash";
const HomePage = () => {
  const navigate = useNavigate();
  const [slides, setslides] = useState([]);
  const [subHeader, setsubHeader] = useState([]);
  const [category, setcategory] = useState([]);
  const [stickyPanel, setstickyPanel] = useState({
    text: "",
    url: "",
    position: "right",
  });
  const [sections, setsections] = useState({});
  const [selectedVariant, setselectedVariant] = useState({
    field1: "",
    value1: "",
    field2: "",
    value2: "",
  });
  const [sizes, setsizes] = useState({ header1: 70, header2: 30 });

  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    getLayout().then(
      ({
        headerElement,
        subHeaderElement,
        category,
        stickyPanel,
        sections,
      }) => {
        setsizes({
          header1: headerElement.size,
          header2: subHeaderElement.size,
        });
        setsubHeader(subHeaderElement.rows);
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
        setsections(groupBy(sections, "section"));
      }
    );
  }, [location.pathname]);

  const getCols = (prodPerRow, gap) => {
    return `grid-cols-[repeat(auto-fit,minmax(calc((100%/${prodPerRow})-${gap}px),1fr))]`;
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex gap-1 md:gap-4 h-[360px] md:h-[420px] lg:h-[500px]">
          <div style={{ width: `${sizes.header1}%` }}>
            <Slider slidesPerView={1} slides={slides} />
          </div>
          <div
            className="flex flex-col gap-2"
            style={{ width: `${sizes.header2}%` }}
          >
            {subHeader.map(({ file, size, url }) => (
              <img
                key={url}
                src={getFileUrl(file)}
                alt=""
                style={{ height: `${size}%` }}
                className="w-full"
                onClick={() => navigate(url)}
              />
            ))}
          </div>
        </div>
        <DividerWithText>Top Sales On Top Products</DividerWithText>
        <div className=" ">
          <text className="text-2xl font-bold text-[#353434]">
            Our Category
          </text>
          <div className="flex gap-1 md:gap-4 lg:gap-6 mt-4 h-[90px] md:h-[110px] lg:h-[140px] overflow-hidden overflow-x-auto">
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
        {Object.values(sections).map((section) => (
          <div className="flex flex-col md:flex-row gap-4">
            {section.map(
              ({
                categoryName,
                gap,
                overlaySubText,
                overlayText,
                prodPerRow,
                products,
                size,
                type,
                overlayBgImage,
              }) =>
                type === "Banner" ? (
                  <div
                    className="bento"
                    data-type={type}
                    style={{ width: `${size}%` }}
                  >
                    <img
                      src={
                        overlayBgImage && overlayBgImage !== ""
                          ? getFileUrl(overlayBgImage)
                          : ""
                      }
                      alt=""
                      className=""
                    />
                    <div className="transparent-overlay">
                      <p className="overlay-header">
                        {overlayText} <ArrowUpRightIcon />
                      </p>
                      <p className="overlay-text">{overlaySubText}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bento"
                    data-type={type}
                    style={{ width: `${size}%` }}
                  >
                    <text className="text-2xl font-bold text-[#353434]">
                      {categoryName}
                    </text>
                    {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-2 mt-4"> */}
                    <div
                      style={{
                        gap: `${gap}px`,
                        marginTop: "1rem",
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit, minmax(190px,calc((100% / ${prodPerRow}) - ${gap}px)))`,
                      }}
                      // className={`grid gap-[${gap}px] mt-4 grid-cols-[repeat(auto-fit,minmax(calc((100%/${prodPerRow})-${gap}px),1fr))]`}
                    >
                      {products.map((product) => (
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
                )
            )}
          </div>
        ))}
      </div>
      <div className="hidden fixed bg-gray-600 z-[999] bottom-[190px] right-0 h-[260px] md:flex items-center text-center">
        <p className="rotate-[-180deg]  text-white px-2 font-bold text-sm [writing-mode:vertical-rl] ">
          {stickyPanel.text}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
