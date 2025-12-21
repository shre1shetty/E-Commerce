import React from "react";
import { Minus, Plus } from "lucide-react";
import { getFileUrl, parseValueMap } from "@/lib/utils";
import { changeQuantity } from "../service";
import { LS } from "@/lib/SecureLocalStorage";
const CartTab = ({ products, setcurrent, setitems, setproducts, summary }) => {
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
      formattedName += `${key.slice(0, -1)}: ${value} / `;
    }
    return formattedName.slice(0, -3); // Remove the last " / "
  };

  const handleQuantityChange = ({ quantity, _id }) => {
    changeQuantity({
      quantity,
      _id,
      userId: LS.get("userId"),
    }).then((resp) => setproducts(resp.products));
  };
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-6  mt-6">
      <div className="col-span-2 flex flex-col gap-4 overflow-y-auto">
        {products.map(({ _id, productId, variant, quantity }, index) => (
          <div className="">
            <div key={index} className="cart-item">
              <div className="cart-image-container">
                <img
                  src={getFileUrl(
                    productId.variantValues.find(({ _id }) => _id === variant)
                      .values.picture[0]
                  )}
                  alt=""
                  className="cart-product-image"
                />
              </div>
              <div className="cart-product-details">
                <div htmlFor="" className="name">
                  {productId.name}
                </div>
                <div htmlFor="" className="description">
                  {productId.description.length > 50
                    ? productId.description.slice(0, 50) + "..."
                    : productId.description}
                </div>
                <div className="variant">
                  {getVariantName({
                    variantFields: productId.variantFields,
                    variantValues: productId.variantValues,
                    variant,
                  })}
                </div>
                <div className="price">
                  ₹
                  {
                    productId.variantValues.find(({ _id }) => _id === variant)
                      .values.discountedPrice
                  }{" "}
                </div>
              </div>
            </div>
            <div className="quantity-container">
              <div className="quantity">
                <button
                  className=""
                  onClick={() =>
                    handleQuantityChange({ quantity: quantity - 1, _id: _id })
                  }
                >
                  <Minus size={12} />
                </button>
                {quantity}
                <button
                  className=""
                  onClick={() =>
                    handleQuantityChange({
                      quantity: quantity + 1,
                      _id: _id,
                    })
                  }
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col">
        <div className="blur-container">
          <div className="order-summary">
            <label htmlFor="" className="order-summary-label">
              Order Summary
            </label>
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
            <button
              className="toCheckout"
              onClick={() => {
                setcurrent(2);
                setitems((prev) => {
                  return prev.map((item, index) => {
                    if (index === 0) {
                      return { ...item, status: "finish" };
                    }
                    if (index === 1) {
                      return { ...item, status: "process" };
                    }
                    return item;
                  });
                });
              }}
            >
              Proceed to Checkout
            </button>
            <div className="expected-delivery">
              Expected Delivery by <span className="">14th July 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTab;
