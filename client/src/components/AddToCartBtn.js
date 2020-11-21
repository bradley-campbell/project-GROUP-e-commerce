import React from "react";
import styled from "styled-components";
import { COLORS } from "../ConstantStyles";

const AddToCartBtn = () => {
  return <Button>Add To Cart</Button>;
};

const Button = styled.button`
  border-radius: ${COLORS.borderRadius};
  color: ${COLORS.white};
  border: none;
  padding: 10px 17px;
  background: ${COLORS.primary};
  cursor: pointer;
  &:hover {
    background: ${COLORS.accent};
  }

  &:active {
    background: ${COLORS.secondary};
  }
`;

export default AddToCartBtn;
