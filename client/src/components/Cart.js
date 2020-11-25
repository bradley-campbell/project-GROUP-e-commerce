import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { togglePaymentView } from "../actions/statusActions";
import { COLORS } from "../ConstantStyles";
import CartItem from "./CartItem";

const Cart = () => {
  const cartState = useSelector((state) => state.cartState);
  const cartArray = Object.values(cartState);
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.viewState);

  const subTotal = useSelector((state) => {
    const values = Object.values(state.cartState);
    return values.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  });
  const total = subTotal * 1.15;

  const numberOfItems = useSelector((state) => {
    const values = Object.values(state.cartState);
    return values.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });

  const proceedToPayment = () => {
    dispatch(togglePaymentView());
  };

  console.log(viewState);

  return (
    <Wrapper>
      <Container>
        <Top>
          <Header>Your Cart</Header>
          <SubHeader> {numberOfItems} items</SubHeader>
        </Top>
        {cartArray.length > 0 &&
          cartArray.map((item) => {
            return <CartItem item={item} />;
          })}
        <Bottom>
          <TotalContainer>
            <SubTotal>Subtotal: ${subTotal.toFixed(2)}</SubTotal>
            <Total>Total: ${total.toFixed(2)}</Total>
            <Button className="addToCart" onClick={proceedToPayment}>
              Proceed to Checkout
            </Button>
          </TotalContainer>
        </Bottom>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${COLORS.white};
  margin: 50px 10vw;
`;

const Container = styled.div`
  box-shadow: -1px -1px 18px 0px rgba(50, 50, 50, 0.21);
  background: white;
  width: 75%;
  border-radius: ${COLORS.borderRadius};
`;

const Top = styled.div`
  border-bottom: 0.5px solid lightgray;
  text-align: center;
  padding: 10px;
  line-height: 2em;
`;

const Header = styled.p`
  font-size: 20px;
  font-weight: lighter;
`;

const SubHeader = styled.p`
  font-size: 14px;
  color: grey;
`;

const Bottom = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const TotalContainer = styled.div`
  text-align: right;
  margin-right: 20px;
  line-height: 2em;
`;

const SubTotal = styled.p`
  color: darkgray;
  padding-right: 30px;
`;

const Total = styled.p`
  padding-right: 30px;
`;

const Button = styled.button`
  display: block;
  margin: 10px;
`;

export default Cart;
