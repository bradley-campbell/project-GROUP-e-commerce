import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../ConstantStyles";
import { Link, useHistory } from "react-router-dom";

import { addItem } from "./../actions";
import { getStoreItemArray } from "../reducers/cart-reducer";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const storeItems = useSelector(getStoreItemArray);
  const { name, price, numInStock, imageSrc, id } = item; // Destructured item to have direct access to variables
  let history = useHistory();

  return (
    <Wrapper onClick={() => history.push(`/product/${id}`)}>
      <ProductImg src={imageSrc} width="100%" />
      <Info>
        <Name>{name}</Name>
        <Price>${price}</Price>
        {numInStock > 0 ? (
          // Added button styling inside the component instead of creating a separate component, for simplicity
          <Button
            className="addToCart"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addItem({ ...item, id }));
            }}
          >
            AddToCart
          </Button>
        ) : (
          <OutOfStock>Out of Stock</OutOfStock>
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 30px;

  background: white;
  border-radius: ${COLORS.borderRadius};
  text-align: center;
  cursor: pointer;
`;

const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 10px solid white;
  border-radius: ${COLORS.borderRadius};
  transition: 0.5s ease;

  ${Wrapper}:hover & {
    width: 214px;
    height: 214px;
    margin: -7px 0 0 -7px;
    box-shadow: -1px -1px 18px 0px rgba(50, 50, 50, 0.21);
  }
`;

const Name = styled.p`
  font-weight: bold;
  line-height: 1.2em;
  color: black;
  padding: 30px 30px 20px 30px;
`;

const Price = styled.p`
  color: black;
`;

const Info = styled.div`
  position: relative;
  top: -237px;
  bottom: 0;
  left: -8px;
  right: 0;
  height: calc(100% + 35px);
  width: calc(100% + 35px);
  border-radius: ${COLORS.borderRadius};
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgb(245, 244, 242, 0.7);

  &:hover {
    opacity: 100%;
  }
`;

const OutOfStock = styled.div`
  position: absolute;
  bottom: 40px;
  margin-top: 10px;
  left: 72px;
  color: darkred;
  border: ${COLORS.borderRadius};
  margin-top: 10px;
  font-weight: bold;
`;

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  margin-top: 10px;
  left: 67px;
`;

export default Item;
