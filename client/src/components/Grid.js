import React from "react";
import styled from "styled-components";
import Item from "./Item";

const Grid = ({ itemData }) => {
  let items = [1, 2, 3];

  return (
    <Wrapper>
      {/* {itemData.map((item) => (
        <Item item={item} />
      ))} */}
    </Wrapper>
  );
};

export default Grid;

const Wrapper = styled.div`
  margin: 50px 150px 50px 150px;
  min-height: 100vh;
  padding-top: 15px;
  background-color: var(--accent);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
