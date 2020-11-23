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
import ItemsByCategory from "./ItemsByCategory";
import Payment from "./Payment/Payment";
import ProductByCompany from "./ProductByCompany";
import ProductDetails from "./ProductDetails";
import SearchResults from "./SearchResults";
import { COLORS } from "../ConstantStyles";

function App() {
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
        <Header />

        <Switch>
          <Route exact path="/home">
            <Home />
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

          <Route exact path="/category/:categoryId">
            <ItemsByCategory />
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
      </Router>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background: ${COLORS.white};
`;

const Grid = styled.div``;
