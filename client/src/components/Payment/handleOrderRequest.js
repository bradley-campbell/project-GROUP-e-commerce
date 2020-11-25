const handleOrderRequest = async (form, cart, subtotal) => {
  console.log({ body: { formData: form, cart, subtotal } });

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

export default handleOrderRequest;
