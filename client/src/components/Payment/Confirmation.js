import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { COLORS } from "../../ConstantStyles";

const Confirmation = ({ orderInfo }) => {
  const {
    orderId,
    formData: { givenName, email },
  } = orderInfo;

  return (
    <Container>
      <FaCheckCircle size="3em" />
      <Header>Thank you for your order, {givenName}!</Header>
      <OrderNumber>Your order number is {orderId}.</OrderNumber>
      <Email>An confirmation has been sent to {email}.</Email>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
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
  margin: 15px 0 15px 0;
`;

const Email = styled.p`
  margin: 10px;
`;

export default Confirmation;
