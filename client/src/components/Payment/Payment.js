import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "./Input";
import { formValidation } from "./InputValidation";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { togglePaymentView } from "../../actions/statusActions";

const item = {
  name: "Jawbone UP24 Activity Tracker Wristband, Pink Coral, M",
  price: "$129.99",
  body_location: "Wrist",
  category: "Lifestyle",
  _id: 6794,
  imageSrc:
    "data:image/jpeg;base64,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",
  numInStock: 14,
  companyId: 18834,
};

const Payment = () => {
  const [formData, setFormData] = useState({});
  const viewState = useSelector((state) => state.viewState);
  const { paymentPageView, confirmationPageView } = viewState;

  const cartState = useSelector((state) => state.cartState);
  const cartArray = Object.values(cartState);
  console.log(cartArray);

  const dispatch = useDispatch();

  const closeModal = (ev) => {
    dispatch(togglePaymentView());
  };

  const handleFetch = async () => {
    console.log(formData);
    console.log("fetch");
    // Sent form data + cart to BE
    //Confirm page becomes visible
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
          <Form setFormData={setFormData} />
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
