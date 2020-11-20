import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GoTrashcan } from "react-icons/go";

import {
  addItem,
  removeItem,
  removeItemCompletely,
  updateQuantity,
} from "./../actions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  // const itemFromState = useSelector((state) => state[id]);

  const { _id, imageSrc, name, price, quantity } = item;
  const id = _id;
  console.log(id);
  return (
    <Wrapper>
      <Image src={imageSrc} /> <Name>{name}</Name>
      <Price>${price}</Price>
      <QuantityContainer>
        <DecrementButton
          onClick={() => {
            quantity > 1
              ? dispatch(removeItem({ id, ...item }))
              : dispatch(removeItemCompletely({ id }));
          }}
        >
          -
        </DecrementButton>
        <Quantity
          // placeholder="0"
          value={quantity}
          onChange={(e) => {
            dispatch(updateQuantity({ id, quantity: e.target.value, ...item }));
          }}
        ></Quantity>
        <IncrementButton onClick={() => dispatch(addItem({ id, ...item }))}>
          +
        </IncrementButton>
      </QuantityContainer>
      <RemoveButton
        onClick={() => {
          dispatch(removeItemCompletely({ id }));
        }}
      >
        <GoTrashcan />
      </RemoveButton>
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

const Image = styled.img`
  height: 100px;
  width: 100px;
`;

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
