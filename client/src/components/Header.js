import React from "react";
import styled from "styled-components";
import { FaShoppingCart as CartIcon } from "react-icons/fa";

const Header = () => {
  return (
    <Wrapper>
      <h1>Fetch Store</h1>
      <Navigation>
        Link Link Link Link
        <input />
        <CartIcon size={55} />
      </Navigation>
      <h1>cart</h1>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  height: 5%;
  min-height: 60px;
  background-color: pink;
`;

const Navigation = styled.div`
  width: 60%;
`;
