import React, { useState } from "react";
import styled from "styled-components";
import { FiShoppingCart as CartIcon } from "react-icons/fi";
import { NavLink, Link, useHistory } from "react-router-dom";
import { COLORS } from "../ConstantStyles";
import { useSelector } from "react-redux";

const Header = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const viewState = useSelector((state) => state.viewState);
  const { cartItemTotal } = viewState;

  const dropHandle = () => {
    setDropOpen(!dropOpen);
  };
  const handlePushHis = (que) => {
    history.push(`/search/${que}`);
  };

  return (
    <Wrapper>
      <LogoLink exact to="/">
        <ShopTitle>SHOP FETCH</ShopTitle>
      </LogoLink>
      <Navigation>
        <NavStyle exact to="/all" activeStyle={{ color: "pink" }}>
          <h3>All</h3>
        </NavStyle>
        <NavStyle exact to="/company" activeStyle={{ color: "pink" }}>
          <h3>Brands</h3>
        </NavStyle>
        <NavDrop>
          <DropBtn onClick={() => dropHandle()}>Body Location</DropBtn>

          {dropOpen && (
            <DropdownContent onClick={() => dropHandle()}>
              <DropItem exact to="/bodylocation/wrist">
                wrist
              </DropItem>
              <DropItem exact to="/bodylocation/arms">
                arms
              </DropItem>
              <DropItem exact to="/bodylocation/head">
                head
              </DropItem>
              <DropItem exact to="/bodylocation/waist">
                waist
              </DropItem>
              <DropItem exact to="/bodylocation/chest">
                chest
              </DropItem>
              <DropItem exact to="/bodylocation/hands">
                hands
              </DropItem>
              <DropItem exact to="/bodylocation/neck">
                neck
              </DropItem>
              <DropItem exact to="/bodylocation/feet">
                feet
              </DropItem>
              <DropItem exact to="/bodylocation/torso">
                torso
              </DropItem>
            </DropdownContent>
          )}
        </NavDrop>
        <form
          onSubmit={(ev) => {
            //ev.preventDefault();
            /*fetch(`/product/search/?search=${query}`) // sending info to backend by params
              .then((data) => data.json())
              .then((data) => {
                handlePushHis(data, query);
              }); // later work after backend*/
            handlePushHis(query);
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
          {cartItemTotal !== 0 && cartItemTotal}
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
  position: relative;
  display: inline-block;
  &:hover {
    color: ${COLORS.white};
  }
`;

//dropdown stuff

const NavDrop = styled.div``;
const DropBtn = styled.button`
  border: none;
  background: transparent;
  color: ${COLORS.white};
  cursor: pointer;
  margin: 0px -2px;
  font-size: 15px;
  padding: 5px 8px;
  width: 120px;
  &:active {
    background: ${COLORS.secondary};
  }
`;

const DropdownContent = styled.ul`
  margin-top: 18px;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  left: 0;
  opacity: 0.9;
  background: ${COLORS.primary};
  width: calc(100vw - (100vw - 100%));
  padding: 0 10vw;
`;

const DropItem = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: calc(70vw / 9);
  background: ${COLORS.primary};
  color: white;
  padding: 10px 10px;
  margin: 5px 0;
  &:hover {
    background: ${COLORS.accent};
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
