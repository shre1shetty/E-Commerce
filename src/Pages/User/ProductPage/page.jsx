import { getFileUrl } from "@/lib/utils";
import {
  getProductById,
  getRatingsByproductId,
} from "@/Pages/Admin/ProductsToDisplay/service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Rating } from "primereact/rating";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartIcon,
  Share2,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import ImageMagnifier from "@/Components/ImageMagnifier/ImageMagnifier";
import { Rate } from "antd";
import { LS } from "@/lib/SecureLocalStorage";
import LoginModal from "@/Pages/Login/LoginModal";
import { addToCart } from "./service";
import { setCount } from "@/Redux/Slice/CountSlice";
import { useDispatch } from "react-redux";
const page = () => {
  const { id } = useParams();
  const [selectedVariant, setselectedVariant] = useState({});
  const [selectedVariantField, setselectedVariantField] = useState({});
  const [selectedImage, setselectedImage] = useState(null);
  const [openDescription, setopenDescription] = useState(false);
  const [openSpecification, setopenSpecification] = useState(false);
  const [reviewImages, setreviewImages] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const [product, setproduct] = useState({
    name: "",
    brand: "",
    category: [],
    description: "",
    fabric: "",
    fitType: "",
    inStock: 0,
    pictures: [],
    price: 0,
    productType: "",
    sold: 0,
    variantFields: [],
    variantValues: [],
  });

  function getTextButton(value, field) {
    return (
      <button
        className={`product-page-text-button ${
          selectedVariantField[field] === value
            ? "active-product-page-text-button"
            : ""
        }`}
        onClick={() =>
          setselectedVariantField((prev) => ({ ...prev, [field]: value }))
        }
      >
        {value}
      </button>
    );
  }

  function getFillButton(value, field) {
    const image = product.variantValues.find((val) => val.name.includes(value))
      ?.values.picture[0];
    return (
      <div
        className={`flex flex-col text-center ${
          selectedVariantField[field] === value
            ? "active-product-page-fill-button"
            : ""
        }`}
        onClick={() =>
          setselectedVariantField((prev) => ({ ...prev, [field]: value }))
        }
      >
        <button className="product-page-fill-button">
          <img src={image ? getFileUrl(image) : ""} alt="" className="" />
        </button>
        <span
          className="text-sm font-semibold opacity-50"
          style={{ color: value.toLowerCase() === "white" ? "black" : value }}
        >
          {value}
        </span>
      </div>
    );
  }

  function addToCartHandler({ userId, productId, quantity, price, variant }) {
    if (!userId || userId === "") {
      console.log("");
      setopen(true);
      return;
    } else {
      // console.log({ userId, productId, quantity, price, variant });
      addToCart({ userId, productId, quantity, price, variant }).then(
        (resp) => {
          // console.log(resp);
          dispatch(setCount(resp.products.length));
        }
      );
    }
  }

  const src = selectedImage ? getFileUrl(selectedImage) : "";

  useEffect(() => {
    getProductById(id).then((resp) => {
      setproduct(resp);
      setselectedImage(resp.variantValues[0].values.picture[0]);
      setselectedVariantField(
        resp.variantFields.reduce((acc, field) => {
          acc[field.field] = field.value[0];
          return acc;
        }, {})
      );
    });
    getRatingsByproductId(id).then((resp) => {
      setreviews(resp);
      setreviewImages(
        resp.reduce((acc, curr) => [...acc, ...curr.pictures], [])
      );
    });
  }, []);
  useEffect(() => {
    // console.log(selectedVariantField);
    const selectedVariant = product.variantValues?.find(({ name }) =>
      Object.values(selectedVariantField)?.every((val) => name.includes(val))
    );
    setselectedImage(selectedVariant?.values?.picture[0]);
    setselectedVariant(selectedVariant || {});
  }, [selectedVariantField]);
  return (
    <div>
      <div className=""></div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <div className="p-2.5 rounded-md bg-[#f6f6f6] relative flex justify-center">
            {/* <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src,
                  height: 470,
                },
                largeImage: {
                  src,
                  width: 900,
                  height: 700,
                },
                enlargedImageContainerStyle: {
                  zIndex: "1500",
                  backgroundColor: "#80808078",
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
                },
                // enlargedImageStyle: {
                //   objectFit: "contain",
                // },
                enlargedImagePosition: "beside",
                isHintEnabled: true,
                shouldUsePositiveSpaceLens: true,
              }}
            /> */}
            <ImageMagnifier src={src} height={480} width={"auto"} />
            {/* <img
              src={selectedImage ? getFileUrl(selectedImage) : ""}
              alt=""
              className="selectedImageContainer"
            /> */}
            <button className="product-page-wishlist-button">
              <HeartIcon size={16} />
            </button>
          </div>
          <div className="flex gap-2 w-full bg-[#f6f6f6] p-1">
            <button className="bg-white text-[darkgray] hover:text-[gray]">
              <ChevronLeft />
            </button>
            <div className="flex gap-2 grow">
              {selectedVariant?.values?.picture?.map((pictureId, index) => (
                <img
                  src={getFileUrl(pictureId)}
                  alt=""
                  className="h-16 w-16 rounded bg-white cursor-pointer"
                  onClick={() => setselectedImage(pictureId)}
                />
              ))}
            </div>
            <button className="bg-white text-[darkgray] hover:text-[gray]">
              <ChevronRight />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="product-page-addToCart-button"
              onClick={() =>
                addToCartHandler({
                  userId: LS.get("userId"),
                  productId: product._id,
                  quantity: 1,
                  price: selectedVariant.values.price,
                  variant: selectedVariant._id,
                })
              }
            >
              <ShoppingCart fill="white" />
              Add To Cart
            </button>

            <button className="product-page-buyNow-button">
              <Zap fill="white" />
              Buy Now
            </button>
          </div>
        </div>
        <div className="col-span-3 relative">
          <div className="flex justify-between">
            <div className="product-page-name">{product.name} </div>
            <button className="">
              <Share2 />
            </button>
          </div>
          <div className="product-page-category">
            {product.category.map((val) => val.label).toString()}
          </div>
          <hr className="my-2" />
          <div className="product-page-price">₹ {product.price}</div>
          <span className="text-xs">MRP incl. of all taxes</span>
          <div className="flex gap-2 items-end mt-2 leading-[normal] text-[#7e5600]">
            <Rate allowHalf value={4.5} disabled />
            <span className="text-xs">1299902 reviews</span>
          </div>
          <div className="my-6 flex flex-col gap-4">
            {product.variantFields?.map(({ field, flag, value }) => (
              <div className="flex items-center gap-4" key={field}>
                <label htmlFor="" className="product-page-variant-label">
                  {field}
                </label>
                <div className="flex gap-2">
                  {value?.map((val, index) => (
                    <>
                      {flag === "Text" && getTextButton(val, field)}
                      {flag === "Fill" && getFillButton(val, field)}
                    </>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="product-page-collapse-button"
            data-open-collapse={openDescription}
            onClick={() => setopenDescription((prev) => !prev)}
          >
            <div className="collapse-header">
              <label htmlFor="" className="">
                Product Description
              </label>
              <ChevronDown />
            </div>
            <div className="collapse-body">{product.description}</div>
          </button>
          <button
            className="product-page-collapse-button"
            data-open-collapse={openSpecification}
            onClick={() => setopenSpecification((prev) => !prev)}
          >
            <div className="collapse-header">
              <label htmlFor="" className="">
                Additional Specification
              </label>
              <ChevronDown />
            </div>
            <div className="collapse-body">
              <ul className="">
                <li className="">Brand : {product.brand}</li>
                <li className="">Fabric : {product.fabric}</li>
                <li className="">Fit Type : {product.fitType}</li>
              </ul>
            </div>
          </button>
          <hr className="my-2" />
          <div className="product-page-reviews-div">
            <div className="product-page-reviews-header">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="">
                  Ratings & Reviews
                </label>
                <span className="text-xs mt-1">(1299902 reviews)</span>
              </div>

              <button className="">Rate this product</button>
            </div>
            <div className="product-page-review-images">
              Images by customers
              <div className="review-images-container">
                {reviewImages.map((image, index) => (
                  <img
                    src={getFileUrl(image)}
                    alt=""
                    key={index}
                    className="h-16 w-16 rounded bg-white cursor-pointer"
                  />
                ))}
              </div>
              <div className="review-messages">
                Reviews
                <div className="h-[130px] overflow-auto">
                  {reviews.map((review, index) => (
                    <div className="review-message" key={index}>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-slate-700">
                          {review.userId?.username}
                        </span>
                        <span className="flex text-sm font-semibold items-center">
                          [ {review.rating}
                          <Star size={16} fill="#f59e0b" /> ]
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={open} setopen={setopen} />
    </div>
  );
};

export default page;
