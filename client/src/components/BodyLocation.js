import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Grid from "./Grid";

const BodyLocation = () => {
  const [items, setItems] = useState("");
  const params = useParams();
  const bodyLocation = params.bodylocationId;

  useEffect(() => {
    fetch(`/product/by-bodyLocation/${bodyLocation}`)
      .then((res) => res.json())
      .then((res) => {
        setItems([...res.products]);
      });
  }, [bodyLocation]);

  return (
    <Wrapper>
      <Head>
        Products for{" "}
        {bodyLocation.charAt(0).toUpperCase() +
          bodyLocation.substr(1).toLowerCase()}
      </Head>
      <Grid itemsData={items} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

const Head = styled.div`
  font-size: 20px;
  margin: 30px;
`;

export default BodyLocation;
