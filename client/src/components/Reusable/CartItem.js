import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

import {
  removeItem,
  updateQuantity,
} from "../../actions/cartActions";
import { COLORS } from "../../ConstantStyles";

const CartItem = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { id, imageSrc, name, price, quantity, numInStock, companyName } = item;

  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  console.log(cartState);

  return (
    <Wrapper>
      <Image
        src={imageSrc}
        onClick={() => {
          history.push(`/product/${id}`);
        }}
      />{" "}
      <Name
        onClick={() => {
          history.push(`/product/${id}`);
        }}
      >
        {name}
        <CompanyName>by {companyName}</CompanyName>
      </Name>
      <Price>${price}</Price>
      <QuantityContainer>
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
  padding-top: 10px;
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
  padding: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const Price = styled.p`
  grid-area: itemprice;
  margin-right: 10px;
  padding: 20px 0px 10px 120px;
  font-size: 14px;
  border-top: 1px solid rgba(50, 50, 50, 0.05);
`;

const QuantityContainer = styled.div`
  grid-area: quant;
  font-size: 16px;
  margin-top: 40px;
  margin-left: 5px;
  font-weight: lighter;
  color: darkgray;
`;

const Quantity = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: bold;
  resize: none;
  margin-left: 15px;
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
  padding-top: 0px;
  grid-area: trash;
  border: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Name = styled.p`
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CompanyName = styled.p`
  display: block;
  color: ${COLORS.accentdark};
  font-size: 14px;
  margin-top: 10px;
`;

export default CartItem;
