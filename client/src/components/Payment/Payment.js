import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "./Input";
import { formValidation } from "./InputValidation";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { togglePaymentView } from "../../actions/statusActions";

const Payment = () => {
  const [formData, setFormData] = useState({});
  const viewState = useSelector((state) => state.viewState);
  const { paymentPageView, confirmationPageView } = viewState;

  const cartState = useSelector((state) => state.cartState);
  const cartArray = Object.values(cartState);
  const cartConcise = cartArray.map((item) => {
    console.log(item);
  });
  console.log(cartArray);
  const subtotal = 29.99;

  const dispatch = useDispatch();

  const closeModal = (ev) => {
    dispatch(togglePaymentView());
    handleFetch(formData, cartState, subtotal);
  };

  const handleFetch = async (form, cart, subtotal) => {
    const reqPost = {
      method: "POST",
      body: JSON.stringify({ formData: form, cart, subtotal }), // id quantity
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    // const reqPatch = {
    //   method: "PATCH",
    //   body: JSON.stringify({ form, cart, subtotal }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };

    try {
      let response = await fetch("/order", reqPost);
      response = await response.json();
      console.log(response);
    } catch {
      console.log("error");
    }
  };

  console.log(formData);

  return (
    <Wrapper visible={paymentPageView}>
      <Overlay>
        <Content>
          <ExitButton onClick={closeModal}>
            <AiOutlineCloseCircle size={35} />
          </ExitButton>

          <div>
            <ShopName>Shop Fetch</ShopName>
          </div>

          <OrderSummary>
            <h1>Order Summary</h1>
            <ItemizedList>
              {/* map through items in cart */}
              {cartArray.map((item) => {
                console.log(item.id);
                return (
                  <li>
                    <span>
                      {" "}
                      <a href={`/product/${item.id}`}># {item.id}</a> -{" "}
                      {item.name.slice(0, 30)}
                    </span>
                    <span>1 @ {item.price}</span>
                  </li>
                );
              })}
            </ItemizedList>
            <Totals>
              <div>
                <p>X Items </p>
                <p>Subtotal:</p>
                <p>QST:</p>
                <p>Total:</p>
              </div>
            </Totals>
          </OrderSummary>
          <Form setFormData={setFormData} handleFetch={handleFetch} />
        </Content>
      </Overlay>
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ShopName = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: oblique;
  font-weight: bold;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  width: 50%;
  min-height: 450px;
`;

const ExitButton = styled.button`
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  position: relative;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ItemizedList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 50px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-size: 12px;
  }
`;

const OrderSummary = styled.div`
  margin: 25px 25px 0px 25px;
`;

const Totals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-size: 12px;
  p {
    padding-top: 3px;
  }
`;
