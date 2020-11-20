import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingCart as CartIcon } from "react-icons/fa";
import { NavLink, Link, useHistory } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");

  console.log(query);

  const history = useHistory();

  return (
    <Wrapper>
      <DropDown className="dropdown">Pets Fitness Medical</DropDown>

      <LogoLink exact to="/home">
        <ShopTitle>FETCH</ShopTitle>
      </LogoLink>
      <Navigation>
        <NavLink exact to="/company" activeStyle={{ color: "green" }}>
          <h3>Company</h3>
        </NavLink>
        <NavLink exact to="/bodylocation">
          <h3> Body Location</h3>
        </NavLink>
        <Category>
          <NavLink exact to="/category" className={"category"}>
            <h3>Category</h3>
          </NavLink>
        </Category>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            history.push(`/search/?${query}`);
            setQuery("");
          }}
        >
          <input
            placeholder="Search"
            onChange={(ev) => {
              const formatQuery = ev.target.value;
              setQuery(formatQuery);
            }}
            value={query}
          />
          <button type="submit" disabled={!query}>
            Submit
          </button>
        </form>
      </Navigation>
      <CartWrapper>
        <div>
          <h1>3</h1>
        </div>
        <CartLink exact to="/cart">
          <CartIcon size={55} />
        </CartLink>
      </CartWrapper>
    </Wrapper>
  );
};

export default Header;

const ShopTitle = styled.h1`
  font-family: sans-serif;
  span {
    font-weight: lighter;
  }
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

const NavStyle = styled(NavLink)``;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 80%;
`;

const CartLink = styled(Link)``;

const CartWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 15px;
  }

  div {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    border: 1px white solid;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-color: blue;
    z-index: 2;
    left: 44%;
    top: 20%;
  }
`;

const DropDown = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  height: 250px;
  background-color: purple;
  opacity: 85%;
  width: 100%;
  height: 250px;
  padding: 25px;
  display: flex;
  visibility: hidden;
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
    ${DropDown} {
      background-color: green;
    }
    background-color: yellow;
  }
`;
