import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const Confirmation = () => {
  return (
    <Wrapper>
      <Container>
        <FaCheckCircle size="3em" />
        <Header>Thank you for your order, Name Here!</Header>
        <OrderNumber>Your order number is 19712742904393287.</OrderNumber>
        <Email>
          A confirmation email with order details has been sent to
          email@here.com.
        </Email>
        <OrderDetails>
          <OrderDate>Order Date: DA/TE/HERE</OrderDate>
          <DeliveryAddress>
            <Declaration>Shipping Address:</Declaration>
            <Address>
              <p>Kurt Fizzard</p>
              <p>123 Fake Street</p>
              <p>Montreal, Quebec, 0s0od2</p>
              <p>Canada</p>
            </Address>
          </DeliveryAddress>
        </OrderDetails>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  border-bottom: 2px solid blue;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const Container = styled.div`
  align-items: center;
  background: lightpink;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Header = styled.p`
  /* text-align: center; */
  font-size: 2em;
  font-weight: bold;
  margin: 10px;
`;

const OrderNumber = styled.p`
  /* text-align: center; */
  font-weight: bold;
  font-size: 1.2em;
`;

const Email = styled.p`
  margin: 10px;
`;

const OrderDetails = styled.div`
  border: 2px solid yellow;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const OrderDate = styled.p``;

const DeliveryAddress = styled.div`
  display: flex;
`;

const Declaration = styled.p``;

const Address = styled.div`
  margin-left: 10px;
`;

export default Confirmation;
