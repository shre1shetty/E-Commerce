import { useFormik } from "formik";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";

const FooterElement = ({ values, setvalues }) => {
  const formik = useFormik({
    initialValues: {
      address: "",
      contact: "",
      instagram: "",
      facebook: "",
      youtube: "",
    },
  });
  return (
    <div className="grid grid-cols-5 gap-2 py-4">
      <FloatLabel>
        <InputTextarea
          autoResize
          value={values.address}
          className="p-2 w-full"
          rows={1}
          name={"address"}
          onChange={(event) =>
            setvalues({ ...values, address: event.target.value })
          }
        />
        <label htmlFor="address" className="text-gray-600 -mt-1.5 font-medium">
          Address
        </label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          autoResize
          value={values.contact}
          className="p-2 w-full"
          rows={1}
          name={"contact"}
          onChange={(event) =>
            setvalues({ ...values, contact: event.target.value })
          }
        />
        <label htmlFor="contact" className="text-gray-600 -mt-1.5 font-medium">
          Contact
        </label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          autoResize
          value={values.instagram}
          className="p-2 w-full"
          rows={1}
          name={"instagram"}
          onChange={(event) =>
            setvalues({ ...values, instagram: event.target.value })
          }
        />
        <label
          htmlFor="instagram"
          className="text-gray-600 -mt-1.5 font-medium"
        >
          Instagram
        </label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          autoResize
          value={values.facebook}
          className="p-2 w-full"
          rows={1}
          name={"facebook"}
          onChange={(event) =>
            setvalues({ ...values, facebook: event.target.value })
          }
        />
        <label htmlFor="facebook" className="text-gray-600 -mt-1.5 font-medium">
          Facebook
        </label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          autoResize
          value={values.youtube}
          className="p-2 w-full"
          rows={1}
          name={"youtube"}
          onChange={(event) =>
            setvalues({ ...values, youtube: event.target.value })
          }
        />
        <label htmlFor="youtube" className="text-gray-600 -mt-1.5 font-medium">
          Youtube
        </label>
      </FloatLabel>
    </div>
  );
};

export default FooterElement;
