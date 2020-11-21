import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Grid from "./Grid";

// Fetch items by company selected
const ProductByCompany = () => {
  const { companyId } = useParams();
  const [cProducts, setCProducts] = useState(null);
  const [comInfo, setComInfo] = useState(null);

  useEffect(() => {
    fetch(`/product/by-company/${companyId}`)
      .then((data) => data.json())
      .then((info) => {
        if (info.status === 200) {
          setCProducts(info.products);
          setComInfo(info.company);
        } else {
          console.log(info.error); // may direct to error page
        }
      });
  }, []);

  return cProducts ? (
    <PCWrapper>
      <PCTitle>Products from company {cProducts[0].companyId}</PCTitle>
      <Grid itemsData={cProducts} />
    </PCWrapper>
  ) : (
    <div>Loading page</div>
  );
};

export default ProductByCompany;

const PCWrapper = styled.div``;
const PCTitle = styled.div``;
