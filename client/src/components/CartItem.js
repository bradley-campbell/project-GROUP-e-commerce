import React from "react";
import styled from "styled-components";

const CartItem = () => {
  return (
    <Wrapper>
      <Image />
      <Name>Item Name</Name>
      <Price>Item Price</Price>
      <QuantityContainer>
        <DecrementButton>-</DecrementButton>
        <Quantity placeholder="0"></Quantity>
        <IncrementButton>+</IncrementButton>
      </QuantityContainer>
      <RemoveButton>x</RemoveButton>
      {/* to be replaced with a little garbage can icon? */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  background: lightpink;
  border-bottom: 2px solid blue;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Image = styled.img``;

const Name = styled.p``;

const Price = styled.p``;

const QuantityContainer = styled.div``;

const DecrementButton = styled.button`
  all: unset;
`;

const Quantity = styled.textarea`
  border: none;
  /* box-sizing: border-box; */
  font-weight: bold;
  height: 20px;
  margin: 10px;
  resize: none;
  text-align: center;
  vertical-align: middle;
  width: 20px;
`;

const IncrementButton = styled.button`
  all: unset;
`;

const RemoveButton = styled.button`
  border: none;
`;

export default CartItem;
