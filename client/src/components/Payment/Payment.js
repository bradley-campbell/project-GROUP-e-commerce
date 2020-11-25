import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveData,
  receiveDataError,
  requestData,
  toggleConfirmationView,
  togglePaymentView,
} from "../../actions/statusActions";
import { clearCart } from "../../actions/cartActions";
import Confirmation from "../Confirmation";

const Payment = () => {
  const [cartMinimal, setCartMinimal] = useState({}); // Minimal product information to process order
  const cartState = useSelector((state) => state.cartState); // Cart that has been saved to cartReducer state
  const cartArray = Object.values(cartState); // Cart values in an array to be mapped over in order summary
  const viewState = useSelector((state) => state.viewState); // states saved to statusReducer state
  const {
    paymentPageView, // Boolean to determine if payment form is showin
    confirmationPageView, // Boolean to determine if confirmation message is showing
    totalCartItems, // Number of items currently in the cart -- updates on cart change (see App.js)
    subtotal, // Subtotal of items currently in cart -- updates on cart change (see App.js)
  } = viewState;
  const [response, setResponse] = useState({}); // response from order request containing order number sent from BE
  const qst = subtotal * 0.15; // Calculate before being converted to string in form using toFixed
  const totalWithTax = subtotal + qst; // Calculate before being converted to string in form using toFixed

  useEffect(() => {
    cartArray.forEach((item) => {
      //Generates an object with the minimal data needed from the cart for order placement
      setCartMinimal({
        ...cartMinimal,
        [item.id]: { id: item.id, quantity: item.quantity },
      });
    });
  }, [cartState]);

  const dispatch = useDispatch();

  const closeModal = (ev) => {
    dispatch(togglePaymentView());
    confirmationPageView && dispatch(toggleConfirmationView());
  };

  const handleFetch = async (form, cart, subtotal) => {
    const reqPut = {
      method: "PUT",
      body: JSON.stringify({ formData: form, cart, subtotal }), // id quantity
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const reqPatch = {
      method: "PATCH",
      body: JSON.stringify({ cart: cart }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    dispatch(requestData());
    try {
      let putResponse = await fetch("/order", reqPut);
      putResponse = await putResponse.json();
      setResponse(putResponse);
      console.log(putResponse);

      let patchResponse = await fetch("/product", reqPatch);
      patchResponse = await patchResponse.json();
      console.log(patchResponse.orderId);
      dispatch(receiveData());
      dispatch(clearCart());
      dispatch(toggleConfirmationView());
    } catch (error) {
      dispatch(receiveDataError());
      dispatch(toggleConfirmationView());
      setResponse("An unexpected error has occured, please try again");
    }
  };

  return (
    <Wrapper visible={paymentPageView}>
      <Overlay>
        <Content>
          <ExitButton onClick={closeModal}>
            <AiOutlineCloseCircle size={35} />
          </ExitButton>
          {!confirmationPageView ? (
            <PaymentView>
              <div>
                <ShopName>Shop Fetch</ShopName>
              </div>

              <OrderSummary>
                <h1>Order Summary</h1>
                <ItemizedList>
                  {/* map through items in cart */}
                  {cartArray.map((item) => {
                    return (
                      <li>
                        <span>
                          {" "}
                          <a href={`/product/${item.id}`}># {item.id}</a> -{" "}
                          {item.name.slice(0, 30)}
                        </span>
                        <span>
                          {item.quantity} @ {item.price}
                        </span>
                      </li>
                    );
                  })}
                </ItemizedList>
                <Totals>
                  <div>
                    <p>
                      <span>{totalCartItems}</span> Items{" "}
                    </p>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>QST: ${qst.toFixed(2)}</p>
                    <p>Total: ${totalWithTax.toFixed(2)}</p>
                  </div>
                </Totals>
              </OrderSummary>
              <Form handleFetch={handleFetch} cartMinimal={cartMinimal} />
            </PaymentView>
          ) : (
            <Confirmation orderInfo={response} />
          )}
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

  span {
    font-weight: bold;
  }
`;

const PaymentView = styled.div``;
