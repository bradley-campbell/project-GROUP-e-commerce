import React from "react";

export const handleAddToCart = (item, quantity = 1) => {
  console.log(item, quantity);
  window.alert(item.name + ", Quantity: " + quantity);
};

export default handleAddToCart;
