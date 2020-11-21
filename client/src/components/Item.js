import React from "react";
import styled from "styled-components";

const Item = ({ item }) => {
  console.log(item);

  return (
    <Wrapper>
      {/* onclick push history product/productid */}
      <ProductImg src={item.imageSrc} width="100%" />
      {/* <h2>{item.name}</h2> */}
      <p>${item.price}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 250px;
  margin: 30px;
  line-height: 0.2em;
  border-radius: 10px;
  background: pink; // grab from constant file
  text-align: center;
  cursor: pointer;
`;

const ProductImg = styled.img`
  border-radius: 10px;
`;

const Name = styled.p`
  font-weight: bold;
`;

const Price = styled.p`
  color: gray;
`;

export default Item;
