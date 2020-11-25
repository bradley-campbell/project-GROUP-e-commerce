import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";

import Admin from "./Admin";
import BodyLocation from "./BodyLocation";
import Cart from "./Cart";
import CategoryList from "./CategoryList";
import CompanyList from "./CompanyList";
import Confirmation from "./Confirmation";
import Header from "./Header";
import Home from "./Home";
import All from "./All";
import ItemsByCategory from "./ItemsByCategory";
import Payment from "./Payment/Payment";
import ProductByCompany from "./ProductByCompany";
import ProductDetails from "./ProductDetails";
import SearchResults from "./SearchResults";
import Footer from "./Footer";
import ScrollToTop from "./HandScrollToTop";
import { COLORS } from "../ConstantStyles";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsTotal, setSubtotal } from "../actions/statusActions";

function App() {
  const cartState = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    let subtotal = Object.values(cartState);
    subtotal = subtotal.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    dispatch(setSubtotal(subtotal));

    let totalItems = Object.values(cartState);
    totalItems = totalItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    dispatch(setCartItemsTotal(totalItems));
  }, [cartState]);

  // const [bacon, setBacon] = useState(null);

  // useEffect(() => {
  //   fetch("/bacon")
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Header />
        <Payment />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/all">
            <All />
          </Route>

          <Route exact path="/company">
            <CompanyList />
          </Route>

          <Route exact path="/company/:companyId">
            <ProductByCompany />
          </Route>

          <Route exact path="/product/:productId">
            <ProductDetails />
          </Route>

          <Route exact path="/bodylocation/:bodylocationId">
            <BodyLocation />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/payment">
            <Payment />
          </Route>

          <Route exact path="/confirmation">
            <Confirmation />
          </Route>

          <Route exact path="/search">
            <SearchResults />
          </Route>

          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background: ${COLORS.white};
`;

const Grid = styled.div``;
