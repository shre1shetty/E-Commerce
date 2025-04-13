import AgGrid from "@/Components/AgGrid/AgGrid";
import SelectElement from "@/Components/Select/SelectElement";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import HeaderAddModal from "./Modal/HeaderAddModal";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { FileUpload } from "primereact/fileupload";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
import { Button } from "@/Components/ui/button";
import { Delete, Edit, Trash, Trash2 } from "lucide-react";

const HeaderElement = ({ setHeaderValues, headerElement }) => {
  const formik = useFormik({
    initialValues: {
      file: null,
      url: "",
    },
  });
  const [headerType, setheaderType] = useState(null);
  const [rows, setrows] = useState([]);
  const carouseTypes = [
    {
      value: "carousel",
      label: "Carousel",
    },
    {
      value: "slider",
      label: "Slider",
    },
  ];
  const addSlide = (values) => {
    setHeaderValues({
      ...headerElement,
      rows: [...headerElement.rows, values],
    });
    // setrows((prev) => [...prev, values]);
    formik.resetForm();
  };
  // useEffect(() => {
  //   setHeaderValues({
  //     headerType,
  //     rows,
  //   });
  // }, [headerType, rows]);

  return (
    <>
      <SelectElement
        className="w-1/4 bg-white"
        options={carouseTypes}
        value={carouseTypes.find(
          ({ value }) => value === headerElement.headerType
        )}
        onChange={({ value }) =>
          setHeaderValues({ ...headerElement, headerType: value })
        }
      />
      <div className="flex gap-2 items-end">
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <div className="">
            <Label>Url</Label>
            <Input
              name={"url"}
              value={formik.values.url}
              onChange={formik.handleChange}
            />
          </div>
          <div className="">
            <Label>Image</Label>
            <FileUploadButton
              value={formik.values.file}
              onChange={(file) => formik.setFieldValue("file", file)}
            />
          </div>
        </div>
        <button
          className="px-[18px] py-2 text-white rounded-lg bg-black "
          onClick={() => addSlide(formik.values)}
        >
          Add
        </button>
      </div>
      <AgGrid
        headCells={[
          {
            field: "",
            headerName: "Edit",
            cellRenderer: () => (
              <div className="flex gap-2 items-center font-bold h-[32.5714px]">
                <Edit size={20} />
                <Trash2 size={20} />
              </div>
            ),
          },
          {
            field: "url",
            headerName: "Url",
          },
          {
            field: "file",
            headername: "Image",
            cellRenderer: (params) => {
              return (
                <div className="flex gap-2 items-center font-bold">
                  {/* <img
                    height={50}
                    width={50}
                    src={URL.createObjectURL(params.value)}
                    alt=""
                  /> */}
                  <span className="">{params.value.name}</span>
                </div>
              );
            },
          },
        ]}
        rows={headerElement.rows}
      />
    </>
  );
};

export default HeaderElement;
