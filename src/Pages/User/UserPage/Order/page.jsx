import { Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { getOrdersByType } from "./service";
import GlobalToast from "@/Components/GlobalToast";
import dayjs from "dayjs";
import { getFileUrl, parseValueMap } from "@/lib/utils";

const page = () => {
  const [activeTab, setactiveTab] = useState("Current");
  const [orders, setorders] = useState([]);

  const getVariantName = ({ variantFields, variantName }) => {
    const name = parseValueMap(
      variantFields.reduce((acc, curr, index) => {
        acc = { ...acc, [`field${index + 1}`]: curr.field };
        return acc;
      }, {}),
      variantName.slice(0, -7) // Remove "Variant" from the end
    );
    let formattedName = "";
    for (const [key, value] of Object.entries(name)) {
      formattedName += `${key.slice(0, -1)}: ${value} / `;
    }
    return formattedName.slice(0, -3); // Remove the last " / "
  };

  useEffect(() => {
    getOrdersByType(activeTab)
      .then(setorders)
      .catch((error) => {
        GlobalToast({
          message: "Error fetching records",
          messageTimer: 1200,
          messageType: "error",
        });
      });
  }, [activeTab]);

  return (
    <div>
      <Segmented
        options={["Current", "Fulfilled", "All Orders"]}
        className="w-full sm:w-1/2 !text-sm font-semibold"
        block
        value={activeTab}
        onChange={setactiveTab}
      />
      <div className="">
        {orders.map(
          ({ _id, products, userId, createdAt, status, address, amount }) => (
            <>
              <div className="order-container" key={_id}>
                <div className="title">
                  <h1 className="">Order #:{_id}</h1>
                  <span className="">
                    {products.length} Products | By {userId.username} |{" "}
                    {dayjs(createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
                <div className="grid grid-cols-4 section-container">
                  <div className="section-name">Status :</div>
                  <div className="col-span-3 status-name">
                    {status.stageName}
                  </div>
                  <div className="section-name">Date of delivery:</div>
                  <div className="col-span-3 section-value">
                    {dayjs(createdAt).add(7, "days").format("MMM DD, YYYY")}
                  </div>
                  <div className="section-name">Delivered to:</div>
                  <div className="col-span-3 section-value">{address}</div>
                  <div className="section-total">Total :</div>
                  <div className="col-span-3 section-total">{amount}</div>
                </div>
                <div className="md:grid grid-cols-2">
                  {products.map(
                    ({
                      name,
                      picture,
                      price,
                      quantity,
                      variantFields,
                      variantName,
                    }) => (
                      <div className="flex gap-4 items-center py-3" key={name}>
                        <div className="image-container">
                          <img src={getFileUrl(picture)} alt="" className="" />
                        </div>
                        <div className="product-details">
                          <h1 className="">{name}</h1>
                          <div className="">
                            Quantity : {quantity}x = ₹{price}
                          </div>
                          {getVariantName({
                            variantFields,
                            variantName,
                          })
                            .split("/")
                            .map((val) => (
                              <div className="">{val}</div>
                            ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className=""></div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default page;
