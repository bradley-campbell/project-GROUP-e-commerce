import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Fetch items by company selected
const ProductByCompany = () => {
  const { companyId } = useParams();
  const [cProducts, setCProducts] = useState(null);

  useEffect(() => {
    fetch(`/product/by-company/${companyId}`)
      .then((data) => data.json())
      .then((info) => {
        if (info.status === 200) {
          setCProducts(info.products);
        } else {
          console.log(info.error); // may direct to error page
        }
      });
  }, []);

  return cProducts ? <div></div> : <div>Loading page</div>;
};

export default ProductByCompany;
