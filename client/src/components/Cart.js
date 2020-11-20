import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CartItem from "./CartItem";

import { getStoreItemArray } from "./../reducers";

const Cart = () => {
  const storeItems = useSelector(getStoreItemArray);

  const subTotal = useSelector((state) => {
    const values = Object.values(state);
    return values.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  });
  const total = subTotal * 1.15;

  const numberOfItems = useSelector((state) => {
    const values = Object.values(state);
    return values.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });

  console.log(numberOfItems);

  return (
    <Wrapper>
      <Container>
        <Top>
          <Header>Cart</Header>
          <SubHeader>Your cart contains {numberOfItems} items.</SubHeader>
        </Top>
        {storeItems.map((item) => {
          console.log(item);
          return <CartItem item={item} />;
        })}
        <Bottom>
          <TotalContainer>
            <SubTotal>Subtotal: ${subTotal.toFixed(2)}</SubTotal>
            <Total>Total: ${total.toFixed(2)}</Total>
          </TotalContainer>
          <Button>Proceed to Checkout</Button>
        </Bottom>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  background: yellow;
  border: 2px solid red;
  width: 75%;
`;

const Top = styled.div`
  border-bottom: 2px solid blue;
  padding: 10px;
`;

const Header = styled.p``;

const SubHeader = styled.p``;

const Bottom = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const TotalContainer = styled.div`
  margin-right: 20px;
`;

const SubTotal = styled.p``;

const Total = styled.p``;

const Button = styled.button`
  border: none;
  height: 40px;
`;

export default Cart;
