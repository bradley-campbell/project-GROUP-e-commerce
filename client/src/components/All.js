import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";

export const All = () => {
  const [items, setItems] = useState("");

  useEffect(() => {
    fetch(`/product/random/349`)
      .then((res) => res.json())
      .then((res) => {
        setItems([...res.products]);
      });
  }, []);

  return (
    <Wrapper>
      <Grid itemsData={items} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default All;
