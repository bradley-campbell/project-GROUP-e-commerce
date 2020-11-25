import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const Confirmation = ({ orderInfo }) => {
  const {
    orderId,
    formData: {
      givenName,
      lastName,
      address,
      city,
      province,
      postalCode,
      country,
      email,
    },
  } = orderInfo;

  console.log(orderInfo);

  return (
    <Container>
      <FaCheckCircle size="3em" />
      <Header>Thank you for your order, {givenName}!</Header>
      <OrderNumber>Your order number is {orderId}.</OrderNumber>
      <Email>
        A confirmation email with order details has been sent to {email}.
      </Email>
      <OrderDetails>
        <OrderDate>Order Date: DA/TE/HERE</OrderDate>
        <DeliveryAddress>
          <Declaration>Shipping Address:</Declaration>
          <Address>
            <p>
              {givenName} {lastName}
            </p>
            <p>{address}</p>
            <p>
              {city}, {province}, {postalCode}
            </p>
            <p>{country}</p>
          </Address>
        </DeliveryAddress>
      </OrderDetails>
    </Container>
  );
};

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
