import React, { useEffect } from "react";
import styled from "styled-components";

import CartItem from "./CartItem";

const Cart = () => {
  // useEffect(() => {
  //   fetch("")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  const items = [1, 2, 3];

  return (
    <Wrapper>
      <Container>
        <Top>
          <Header>Cart</Header>
          <SubHeader>Your cart contains # products.</SubHeader>
        </Top>
        {items.map((item) => {
          return <CartItem props={item.toString()} />;
        })}
        <Bottom>
          <TotalContainer>
            <SubTotal>Subtotal</SubTotal>
            <Total>Total</Total>
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
  width: 50%;
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

const TotalContainer = styled.div``;

const SubTotal = styled.p``;

const Total = styled.p``;

const Button = styled.button`
  border: none;
  height: 40px;
`;

export default Cart;
