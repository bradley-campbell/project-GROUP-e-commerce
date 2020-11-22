import React, { useState } from "react";
import styled from "styled-components";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { NavLink, Link, useHistory } from "react-router-dom";
import { COLORS } from "../ConstantStyles";

const Header = () => {
  const [query, setQuery] = useState("");

  console.log(query);

  const history = useHistory();

  return (
    <Wrapper>
      <LogoLink exact to="/home">
        <ShopTitle>SHOP FETCH</ShopTitle>
      </LogoLink>
      <Navigation>
        <NavStyle exact to="/company" activeStyle={{ color: "green" }}>
          <h3>Company</h3>
        </NavStyle>
        <NavStyle exact to="/bodylocation">
          <h3> Body Location</h3>
        </NavStyle>
        <Category>
          <NavStyle exact to="/category" className={"category"}>
            <h3>Category</h3>
          </NavStyle>
        </Category>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            history.push(`/search/?${query}`);
            setQuery("");
          }}
        >
          <Input
            placeholder="Search"
            onChange={(ev) => {
              const formatQuery = ev.target.value;
              setQuery(formatQuery);
            }}
            value={query}
          />
          <Button type="submit" disabled={!query}>
            Submit
          </Button>
        </form>
      </Navigation>
      <CartWrapper>
        <CartNum exact to="/cart">
          2
        </CartNum>
        <CartLink exact to="/cart">
          <CartIcon size={42} color={COLORS.white} />
        </CartLink>
      </CartWrapper>
    </Wrapper>
  );
};

export default Header;

const ShopTitle = styled.h1`
  font-style: oblique;
`;

const Wrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 30px 10px 30px;
  height: 5%;
  min-height: 60px;
  background: ${COLORS.primary};
`;

const Navigation = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  input {
    width: 250px;
  }
`;

const NavStyle = styled(NavLink)`
  color: ${COLORS.accent};

  &:hover {
    color: ${COLORS.white};
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 80%;
`;

const CartLink = styled(Link)``;
const CartNum = styled(Link)`
  color: ${COLORS.white};
  margin-right: -29px;
  margin-top: -7px;
  font-size: 12px;
  font-weight: bolder;
`;

const CartWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 15px;
  }

  div {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    z-index: 2;
    left: 44%;
    top: 20%;
  }
`;

const Category = styled.div`
  background-color: green;
  box-sizing: border-box;
  height: 45px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: yellow;
  }
`;

const Button = styled.button`
  background: ${COLORS.button};
  border-radius: 0 ${COLORS.borderRadius} ${COLORS.borderRadius} 0;
  color: ${COLORS.primary};
  border: none;
  padding: 5px 20px;
  cursor: pointer;

  &:hover {
    background: ${COLORS.accent};
  }
`;

const Input = styled.input`
  background: ${COLORS.white};
  padding: 5px 10px;
  border: none;
  border-radius: ${COLORS.borderRadius} 0 0 ${COLORS.borderRadius};
`;
