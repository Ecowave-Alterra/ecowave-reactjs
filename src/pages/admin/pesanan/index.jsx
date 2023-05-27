import React, { useState } from "react";
import InputField from "../../../components/Search";

const Pesanan = () => {
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <InputField
        id="search-produk"
        placeholder="Masukan ID"
        onChange={handleChange}
      />
      {search !== null ? search : ""}
    </div>
  );
};

export default Pesanan;
