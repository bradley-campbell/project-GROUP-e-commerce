import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";
import BodyLocation from "./Header/BodyLocation";
import Cart from "./Cart";
import CompanyList from "./Header/CompanyList";
import Header from "./Header/Header";
import Home from "./Header/Home";
import All from "./Header/All";
import Payment from "./Payment/Payment";
import ProductByCompany from "./ProductByCompany";
import ProductDetails from "./Reusable/ProductDetails";
import SearchResults from "./Header/SearchResults";
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

          <Route exact path="/search/:searchWord">
            <SearchResults />
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
  width: 100vw;
`;

const Grid = styled.div``;
