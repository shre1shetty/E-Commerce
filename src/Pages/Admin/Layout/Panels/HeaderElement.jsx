import AgGrid from "@/Components/AgGrid/AgGrid";
import SelectElement from "@/Components/Select/SelectElement";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import HeaderAddModal from "./Modal/HeaderAddModal";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { FileUpload } from "primereact/fileupload";
import FileUploadButton from "@/Components/FileUpload/FIleUploadButton";
import { Button } from "@/Components/ui/button";
import { Delete, EditIcon, Trash, Trash2 } from "lucide-react";
import CustomSwitch from "@/Components/Button/CustomSwitch";
import { Segmented, Splitter } from "antd";
import { handleResize } from "@/lib/utils";

const HeaderElement = ({
  setHeaderValues,
  headerElement,
  subHeaderElement,
  setSubHeaderElement,
}) => {
  const containerRef = useRef(null);
  const [childHeader, setchildHeader] = useState(true);
  const formik = useFormik({
    initialValues: {
      file: null,
      url: "",
    },
  });
  const [activeTab, setactiveTab] = useState("Header");
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
  const addSlide = (values, tab) => {
    if (values.id) {
      const id = values.id;
      delete values.id;
      if (tab === "Header") {
        setHeaderValues({
          ...headerElement,
          rows: headerElement.rows.map((value, index) =>
            index.toString() === id ? values : value
          ),
        });
      } else if (tab === "Child Header") {
        setSubHeaderElement({
          ...subHeaderElement,
          rows: subHeaderElement.rows.map((value, index) =>
            index.toString() === id ? values : value
          ),
        });
      }
    } else {
      if (tab === "Header") {
        setHeaderValues({
          ...headerElement,
          rows: [...headerElement.rows, values],
        });
      } else if (tab === "Child Header") {
        const isFirstChild = subHeaderElement.rows.length === 0;
        const equalSize = 100 / (subHeaderElement.rows.length + 1);
        if (isFirstChild) {
          setHeaderValues({
            ...headerElement,
            size: 70,
          });
        }
        setSubHeaderElement({
          ...subHeaderElement,
          size: isFirstChild ? 30 : subHeaderElement.size,
          rows: [...subHeaderElement.rows, values].map((val) => ({
            ...val,
            size: equalSize,
          })),
        });
      }
    }
    formik.resetForm();
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <>
      <div className="flex gap-2">
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
        <CustomSwitch
          label={"Child Header"}
          checked={childHeader}
          onChange={({ value }) => setchildHeader(value)}
        />
      </div>
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
          onClick={() => addSlide(formik.values, activeTab)}
        >
          Add
        </button>
      </div>
      {childHeader && (
        <Segmented
          options={["Header", "Child Header", "Sizing"]}
          className="w-1/2 !text-sm font-semibold"
          block
          value={activeTab}
          onChange={setactiveTab}
        />
      )}
      {(!childHeader || activeTab === "Header") && (
        <AgGrid
          headCells={[
            {
              field: "",
              headerName: "Edit",
              cellRenderer: ({ data, node }) => (
                <div className="flex gap-2 items-center font-bold h-[32.5714px]">
                  <button
                    onClick={() => formik.setValues({ id: node.id, ...data })}
                  >
                    <EditIcon type="button" size={20} />
                  </button>

                  <button
                    onClick={() =>
                      setHeaderValues({
                        ...headerElement,
                        rows: headerElement.rows.filter(
                          (val, index) => index.toString() !== node.id
                        ),
                      })
                    }
                  >
                    <Trash2 size={20} />
                  </button>
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
      )}
      {activeTab === "Child Header" && (
        <AgGrid
          headCells={[
            {
              field: "",
              headerName: "Edit",
              cellRenderer: ({ data, node }) => (
                <div className="flex gap-2 items-center font-bold h-[32.5714px]">
                  <button
                    onClick={() => formik.setValues({ id: node.id, ...data })}
                  >
                    <EditIcon type="button" size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSubHeaderElement({
                        ...subHeaderElement,
                        rows: subHeaderElement.rows.filter(
                          (val, index) => index.toString() !== node.id
                        ),
                      })
                    }
                  >
                    <Trash2 size={20} />
                  </button>
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
          rows={subHeaderElement.rows}
        />
      )}
      {activeTab === "Sizing" && (
        <div ref={containerRef} className="">
          <Splitter
            style={{ height: 500, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            onResize={(pixelSizes) => {
              const [size1, size2] = handleResize(
                pixelSizes,
                containerRef.current?.offsetWidth
              );
              setHeaderValues({ ...headerElement, size: size1 });
              setSubHeaderElement({ ...subHeaderElement, size: size2 });
            }}
          >
            <Splitter.Panel size={`${headerElement.size}%`}>
              <img
                src={URL.createObjectURL(headerElement.rows[0].file)}
                alt=""
                className="h-full"
              />
            </Splitter.Panel>
            <Splitter.Panel size={`${subHeaderElement.size}%`}>
              {subHeaderElement.rows.length > 1 ? (
                <Splitter
                  layout="vertical"
                  onResize={(value) => {
                    const sizes = handleResize(value, 500);
                    setSubHeaderElement({
                      ...subHeaderElement,
                      rows: subHeaderElement.rows.map((val, index) => ({
                        ...val,
                        size: sizes[index],
                      })),
                    });
                  }}
                >
                  {subHeaderElement.rows.map((val, index) => (
                    <Splitter.Panel key={index} size={val.size}>
                      <img
                        src={URL.createObjectURL(val.file)}
                        alt=""
                        className="h-full w-full"
                      />
                    </Splitter.Panel>
                  ))}
                </Splitter>
              ) : (
                <img
                  src={URL.createObjectURL(subHeaderElement.rows[0].file)}
                  alt=""
                  className="h-full w-full"
                />
              )}
            </Splitter.Panel>
          </Splitter>
        </div>
      )}
    </>
  );
};

export default HeaderElement;
