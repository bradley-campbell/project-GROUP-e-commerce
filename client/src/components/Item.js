import React from "react";
import styled from "styled-components";

const Item = ({ item }) => {
  return (
    <Wrapper>
      {/* onclick push history product/productid */}
      <ProductImg
        src="https://www.thehits.co.nz/media/1747385/1.jpg?width=635&height=395&mode=crop"
        width="100%"
      />
      <h2>Burger Hat</h2>
      <p>$500.00</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 250px;
  margin: 30px;
  line-height: 0.2em;
  border-radius: 10px;
  background: pink;  // grab from constant file 
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
