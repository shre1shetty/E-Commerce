import RazorpayButton from "@/Components/Button/PaymentButton";
import { LS } from "@/lib/SecureLocalStorage";
import { getFileUrl, parseValueMap } from "@/lib/utils";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import RazorPayImage from "@/assets/razorpay.png";
import React, { useCallback } from "react";
import { confirmOrder } from "../service";
import { Button } from "@/Components/ui/button";
import GlobalToast from "@/Components/GlobalToast";
import { useNavigate } from "react-router-dom";

const PaymentTab = ({ products, summary, formik }) => {
  const navigate = useNavigate();
  const getVariantName = ({ variantFields, variantValues, variant }) => {
    const variantField = variantValues.find(({ _id }) => _id === variant).name;
    const name = parseValueMap(
      variantFields.reduce((acc, curr, index) => {
        acc = { ...acc, [`field${index + 1}`]: curr.field };
        return acc;
      }, {}),
      variantField.slice(0, -7) // Remove "Variant" from the end
    );
    let formattedName = "";
    for (const [key, value] of Object.entries(name)) {
      formattedName += `${value} / `;
    }
    return formattedName.slice(0, -3); // Remove the last " / "
  };

  const submitOrder = useCallback(
    ({ paymentId, orderId }) => {
      // formik.validateForm
      confirmOrder({
        ...formik.values,
        status: "paid",
        products: formik.values.products.map(
          ({ productId, variant, quantity }) => ({
            productId,
            variant,
            quantity,
          })
        ),
        paymentId,
        orderId,
      })
        .then(({ message }) => {
          GlobalToast({
            message: message || "Order placed successfully",
            messageType: "success",
            messageTimer: 2000,
          });
          navigate(-1);
        })
        .catch((error) => {
          GlobalToast({
            message: error.message || "Order placement failed",
            messageType: "error",
            messageTimer: 2000,
          });
        });
    },
    [formik.values]
  );

  const submitCodOrder = useCallback(() => {
    confirmOrder({
      ...formik.values,
      products: formik.values.products.map(
        ({ productId, variant, quantity }) => ({
          productId,
          variant,
          quantity,
        })
      ),
      paymentId: "COD",
      orderId: "COD",
    })
      .then(({ message }) => {
        GlobalToast({
          message: message || "Order placed successfully",
          messageType: "success",
          messageTimer: 2000,
        });
        navigate(-1);
      })
      .catch((error) => {
        GlobalToast({
          message: error.message || "Order placement failed",
          messageType: "error",
          messageTimer: 2000,
        });
      });
  }, [formik.values]);

  return (
    <div className="grid grid-cols-3 h-[555px] gap-4 mt-6">
      <div className="col-span-2">
        <label htmlFor="" className="">
          Billing Information
        </label>
        <div className="account-details-content mb-4">
          <div className="account-detail-item">
            <label htmlFor="">Name</label>
            <InputText type="text" value={LS.get("username")} disabled />
          </div>
          <div className="account-detail-item">
            <label htmlFor="">Email ID</label>
            <InputText type="email" value={LS.get("email")} disabled />
          </div>
          <div className="account-detail-item">
            <label htmlFor="">Phone</label>
            <InputNumber
              className="w-full"
              placeholder="Enter your phone number"
              maxLength={14}
              useGrouping={false}
              value={formik.values.phone}
              disabled
            />
          </div>
          <div className="account-detail-item col-span-4">
            <label htmlFor="">Shipping Address</label>
            <InputTextarea
              autoResize
              type="text"
              value={`${formik.values.address} , ${formik.values.city} , ${formik.values.state} , ${formik.values.pincode}`}
              disabled
            />
          </div>
        </div>
        <label htmlFor="" className="">
          Payment method
        </label>
        <div className="flex flex-col gap-3">
          <div className="transit-all duration-300 ease-in-out payment-method-tab">
            <div className="payment-method-radio-container">
              <RadioButton
                inputId="paymentMethod1"
                autoFocus
                name="paymentMethod"
                value="PayNow"
                onChange={(e) => formik.setFieldValue("paymentMethod", e.value)}
                checked={formik.values.paymentMethod === "PayNow"}
              />
              <label htmlFor="paymentMethod1" className="ml-2">
                Pay Now
              </label>
            </div>
            {formik.values.paymentMethod === "PayNow" && (
              <div className="payment-div">
                <div className="div-container">
                  <label htmlFor="" className="">
                    Pay securely using razorpay
                  </label>
                  <img src={RazorPayImage} alt="" />
                </div>
                <RazorpayButton
                  amount={formik.values.amount}
                  onSuccess={submitOrder}
                />
              </div>
            )}
          </div>

          <div className="payment-method-tab">
            <RadioButton
              inputId="paymentMethod2"
              name="paymentMethod"
              value="COD"
              onChange={(e) => formik.setFieldValue("paymentMethod", e.value)}
              checked={formik.values.paymentMethod === "COD"}
            />
            <label htmlFor="paymentMethod2" className="ml-2">
              Cash on Delivery
            </label>
            {formik.values.paymentMethod === "COD" && (
              <div className="payment-div">
                <div className="div-container">
                  <label htmlFor="" className="">
                    Pay on Delivery
                  </label>
                </div>
                <Button onClick={submitCodOrder}>Submit</Button>
              </div>
            )}
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="checkout-order-summary ">
        <label htmlFor="" className="">
          Order Summary
        </label>
        <div className="border-b border-gray-500 pb-8">
          <div className="product-list">
            {products.map(({ productId, variant, quantity }, index) => (
              <div className="product-item" key={index}>
                <div className="flex gap-2">
                  <img
                    src={getFileUrl(
                      productId.variantValues.find(({ _id }) => _id === variant)
                        .values.picture[0]
                    )}
                    alt={productId.name}
                  />
                  <div className="text-[10px]">
                    <h3>{productId.name}</h3>
                    {getVariantName({
                      variantFields: productId.variantFields,
                      variantValues: productId.variantValues,
                      variant,
                    })}
                  </div>
                </div>

                <p>
                  <span className="text-sm">
                    ₹
                    {
                      productId.variantValues.find(({ _id }) => _id === variant)
                        .values.price
                    }
                  </span>{" "}
                  x {quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-summary my-8">
          <div className="sub-total">
            <div className="label">Sub Total</div>
            <div className="value">₹{summary.subTotal}</div>
          </div>
          <div className="discount">
            <div className="label">Discount</div>
            <div className="value">-₹{summary.discount}</div>
          </div>
          <div className="tax">
            <div className="label">Tax</div>
            <div className="value">₹{summary.tax}</div>
          </div>
          <div className="shipping">
            <div className="label">Shipping</div>
            <div className="shipping-value">
              {summary.shipping > 0 ? "₹" + summary.shipping : "Free"}
            </div>
          </div>
          <div className="total">
            <div className="label">Total</div>
            <div className="value">₹{summary.amount}</div>
          </div>
          <div className="expected-delivery">
            Expected Delivery by <span className="">14th July 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
