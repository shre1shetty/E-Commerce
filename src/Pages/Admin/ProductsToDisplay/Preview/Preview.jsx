import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { cn, getFileUrl } from "@/lib/utils";
import { isEmpty } from "lodash";
import RegularProductCard from "@/Components/ProductCard/RegularProductCard";
import HomeProductCard from "@/Components/ProductCard/HomeProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
const Preview = ({ data, showPreview }) => {
  const [values, setvalues] = useState({ variantFields: [] });
  const [variantFields, setvariantFields] = useState({
    varient1: "",
    varient2: "",
  });
  const [field1Field2, setfield1Field2] = useState({ field1: "", field2: "" });
  const [picturesArray, setpicturesArray] = useState([]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setvariantFields(
        data.variantFields.reduce(
          (acc, cur, index) => ({
            ...acc,
            [`varient${index + 1}`]: cur.field,
          }),
          {}
        )
      );
      console.log(data);
      setvalues(data);
    }
  }, [data, showPreview]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-auto bg-white text-lg font-medium rounded-md pl-4 py-2 border-l-2",
        showPreview ? "" : "hidden"
      )}
    >
      <label htmlFor="" className="form-label">
        Preview
      </label>
      <Tabs defaultValue="home" className="w-full max-h-[90%] flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="flex-1 overflow-auto">
          <div className="bg-white">
            <HomeProductCard
              key={showPreview}
              label={values?.name}
              description={values.description ?? ""}
              filters={values.variantFields}
              variantValues={values.variantValues}
              price={
                values?.variantValues?.length > 0
                  ? values.variantValues[0].values.price
                  : 0
              }
              discountedPrice={
                values?.variantValues?.length > 0
                  ? values.variantValues[0].values.discountedPrice
                  : 0
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="category" className="flex-1 overflow-auto">
          <div className="bg-white">
            <RegularProductCard
              key={showPreview}
              description={values?.description ?? ""}
              name={values?.name}
              picture={
                values.variantValues?.length > 0 &&
                values.variantValues[0].values.picture.length > 0
                  ? typeof values.variantValues[0].values.picture[0] ===
                    "string"
                    ? getFileUrl(values.variantValues[0].values.picture[0])
                    : URL.createObjectURL(
                        values.variantValues[0].values.picture[0]
                      )
                  : ""
              }
              price={
                values.variantValues?.length > 0
                  ? values.variantValues[0]?.values?.discountedPrice
                  : 0
              }
              variantFields={values?.variantFields}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Preview;
