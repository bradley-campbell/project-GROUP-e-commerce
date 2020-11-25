import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GoTrashcan } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";

import {
  addItem,
  removeItem,
  removeItemCompletely,
  updateQuantity,
} from "../actions/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { id, imageSrc, name, price, quantity, numInStock } = item;

  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  console.log(cartState);

  return (
    <Wrapper>
      <Image src={imageSrc} /> <Name>{name}</Name>
      <Price>${price}</Price>
      <QuantityContainer>
        {/* <DecrementButton
          onClick={() => {
            quantity > 1
              ? dispatch(removeItem({ ...item, id }))
              : dispatch(removeItemCompletely({ id }));
          }}
        >
          -
        </DecrementButton> */}
        Quantity:{" "}
        <Quantity
          min="1"
          max={numInStock}
          type="number"
          value={quantity}
          onKeyPress={(e) => {
            console.log(e);
            e.preventDefault();
            return false;
          }}
          onChange={(e) => {
            dispatch(
              updateQuantity({ ...item, id, quantity: Number(e.target.value) })
            );
          }}
        ></Quantity>
      </QuantityContainer>
      <RemoveButton onClick={handleRemove}>
        <AiOutlineCloseCircle size={20} />
      </RemoveButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: white;
  text-align: left;

  border: 1px solid rgba(50, 50, 50, 0.05);
  display: grid;
  grid-template-columns: 3fr 8fr 4fr 2fr;
  grid-template-rows: 80px 50px;
  grid-template-areas:
    "itempic title quant trash"
    "itempic title itemprice itemprice";
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
`;

const Price = styled.p`
  grid-area: itemprice;
  padding: 20px 10px 10px 120px;
  font-size: 14px;
`;

const QuantityContainer = styled.div`
  grid-area: quant;
  font-size: 16px;
  margin-top: 40px;
  margin-left: 5px;
  font-weight: lighter;
  color: darkgray;
`;

const Grey = styled.span`
  color: grey;
`;

// const DecrementButton = styled.button`
//   all: unset;
// `;

const Quantity = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: bold;
  resize: none;
  margin-left: 5px;
  text-align: center;
  vertical-align: middle;
  height: 20px;
  width: 35px;
`;

const RemoveButton = styled.button`
  color: gray;
  height: 20px;
  margin-left: 50px;
  background: transparent;
  padding-top: 10px;
  grid-area: trash;
  border: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Name = styled.p``;

export default CartItem;
