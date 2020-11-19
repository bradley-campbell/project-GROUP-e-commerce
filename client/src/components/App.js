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
import Payment from "./Payment";
import ProductByCompany from "./ProductByCompany";
import ProductDetails from "./ProductDetails";
import SearchResults from "./SearchResults";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Header />

        <Switch>
          <Route exact to="/home">
            <Home />
          </Route>

          <Route exact to="/company">
            <CompanyList />
          </Route>

          <Route exact to="/company/:companyId">
            <ProductByCompany />
          </Route>

          <Route exact to="/product/:productId">
            <ProductDetails />
          </Route>

          <Route exact to="/bodylocation/:bodylocationId">
            <BodyLocation />
          </Route>

          <Route exact to="/category">
            <CategoryList />
          </Route>

          <Route exact to="/category/:categoryId">
            <ItemsByCategory />
          </Route>

          <Route exact to="/cart">
            <Cart />
          </Route>

          <Route exact to="/payment">
            <Payment />
          </Route>

          <Route exact to="/confirmation">
            <Confirmation />
          </Route>

          <Route exact to="/search">
            <SearchResults />
          </Route>

          <Route exact to="/admin">
            <Admin />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div``;

const Grid = styled.div``;
