import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
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
      // setvariantFields({
      //   varient1: data.variantFields[0]?.field,
      //   varient2: data.variantFields[1]?.field,
      // });
      setvalues(data);
      // if (!isEmpty(data.variantFields[0]) || !isEmpty(data.variantFields[1]))
      //   setfield1Field2({
      //     field1: data.variantFields[0].value[0],
      //     field2: data.variantFields[1].value[0],
      //   });
      // if (data.pictures) {
      // if (
      //   data.variantValues?.find(
      //     (val) =>
      //       val.name ===
      //       `${data.variantFields[0].field}${data.variantFields[0].value[0]}${data.variantFields[1].field}${data.variantFields[1].value[0]}Variant`
      //   )?.values.picture
      // ) {
      //   const PictureArray = data.pictures ?? [];
      //   PictureArray[0] = data.variantValues.find(
      //     (val) =>
      //       val.name ===
      //       `${data.variantFields[0].field}${data.variantFields[0].value[0]}${data.variantFields[1].field}${data.variantFields[1].value[0]}Variant`
      //   )?.values.picture;
      //   setpicturesArray(PictureArray);
      // } else {
      setpicturesArray(data.pictures);
      // }
      // }
    }
  }, [data]);

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
              label={values?.name}
              description={values.description ?? ""}
              filters={values.variantFields}
              variantValues={values.variantValues}
              price={values.price}
            />
          </div>
        </TabsContent>
        <TabsContent value="category" className="flex-1 overflow-auto">
          <div className="bg-white">
            <RegularProductCard
              description={values?.description ?? ""}
              name={values?.name}
              picture={
                picturesArray?.length > 0
                  ? URL.createObjectURL(picturesArray[0])
                  : ""
              }
              price={
                values.variantValues?.find(
                  (val) =>
                    val.name ===
                    `${variantFields.varient1}${field1Field2.field1}${variantFields.varient2}${field1Field2.field2}Variant`
                )?.values?.price
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
