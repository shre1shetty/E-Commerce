import { useEffect, useState } from "react";
import AddressBlock from "./AddressBlock";
import { getRows } from "./service";

const page = () => {
  const [addressList, setaddressList] = useState([]);
  const fetchRows = () => {
    getRows().then(setaddressList);
  };
  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="">
      {addressList.map((data) => (
        <AddressBlock key={data.name} values={data} refreshGrid={fetchRows} />
      ))}
      <AddressBlock newFlag={true} refreshGrid={fetchRows} />
    </div>
  );
};

export default page;
