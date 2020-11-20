import React from "react";
import styled from "styled-components";
import Item from "./Item";

const Grid = () => {
  
  let items = [1, 2, 3];

  return (
    <div>
      {items.map((item) => {
        return <Item item={item} />;
      })}
    </div>
  );
};

export default Grid;
