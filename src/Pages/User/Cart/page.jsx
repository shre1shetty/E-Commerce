import React, { useEffect, useState } from "react";
import "./index.css";
import { getCart } from "./service";
import { LS } from "@/lib/SecureLocalStorage";
import {
  ArrowLeft,
  BaggageClaimIcon,
  HandshakeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setCount } from "@/Redux/Slice/CountSlice";
import { Steps } from "antd";
import CartTab from "./CartTab/page";
import CheckoutTab from "./CheckoutTab/page";
import PaymentTab from "./PaymentTab/page";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
const page = () => {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setcurrent] = useState(1);
  const [items, setitems] = useState([
    {
      title: "Cart",
      status: "process",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Checkout",
      status: "wait",
      icon: <BaggageClaimIcon />,
    },
    {
      title: "Payment",
      status: "wait",
      icon: <HandshakeIcon />,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      userId: LS.get("userId"),
      products: [],
      address: "",
      state: "",
      stateId: "",
      city: "",
      pincode: "",
      orderId: "",
      paymentMethod: "PayNow",
      statusId: "000000000000000000000000",
      paymentId: "",
      phone: LS.get("contactNumber"),
      amount: 0,
      summary: {
        subTotal: 0,
        discount: 30,
        tax: 0,
        shipping: 0,
        total: 0,
      },
    },
  });

  const backButtonHandler = (current) => {
    if (current === 1) navigate(-1);
    setitems((prev) => {
      return prev.map((item, index) => {
        if (index + 1 === current) {
          return { ...item, status: "wait" };
        }
        if (index + 2 === current) {
          return { ...item, status: "process" };
        }
        return item;
      });
    });
    setcurrent((prev) => prev - 1);
  };

  useEffect(() => {
    getCart(LS.get("userId")).then((resp) => {
      setproducts(resp.products);
    });
  }, []);

  useEffect(() => {
    dispatch(setCount(products.length));
    formik.setFieldValue(
      "products",
      products.map((val) => ({ ...val, productId: val.productId._id }))
    );
    const subTotal = products.reduce(
      (acc, { productId, variant, quantity }) => {
        return (
          acc +
          quantity *
            productId.variantValues.find(({ _id }) => _id === variant).values
              .price
        );
      },
      0
    );
    formik.setFieldValue("summary.subTotal", subTotal);
  }, [products]);

  useEffect(() => {
    const total =
      formik.values.summary.subTotal -
      formik.values.summary.discount +
      formik.values.summary.shipping +
      formik.values.summary.tax;
    formik.setFieldValue("summary.total", total);
    formik.setFieldValue("amount", total);
  }, [formik.values.summary]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <div className="cart-page" data-tab={current}>
      <label htmlFor="" className="cart-label">
        {current === 1 ? "Your Cart" : current === 2 ? "Checkout" : "Payment"}
      </label>
      <div className="flex justify-between">
        <Steps className="!w-1/2 !mt-3" items={items} current={current} />
        <button className="" onClick={() => backButtonHandler(current)}>
          <ArrowLeft />
        </button>
      </div>
      {current === 1 && (
        <CartTab
          products={products}
          setcurrent={setcurrent}
          setitems={setitems}
          setproducts={setproducts}
          summary={{
            ...formik.values.summary,
            amount: formik.values.amount,
          }}
        />
      )}
      {current === 2 && (
        <CheckoutTab
          setcurrent={setcurrent}
          setitems={setitems}
          formik={formik}
        />
      )}
      {current === 3 && (
        <PaymentTab
          products={products}
          setcurrent={setcurrent}
          setitems={setitems}
          summary={{
            ...formik.values.summary,
            amount: formik.values.amount,
          }}
          formik={formik}
        />
      )}
    </div>
  );
};

export default page;
