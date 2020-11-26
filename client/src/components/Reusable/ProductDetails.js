import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { COLORS } from "../../ConstantStyles";
import { addItem, updateQuantity } from "../../actions/cartActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState); // Access the state from the cartReducer
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const itemId = params.productId;

  const {
    companyName,
    companyId,
    body_location,
    name,
    imageSrc,
    price,
    numInStock,
    category,
    id,
  } = product;

  const handleAddToCart = () => {
    return !cartState[id]
      ? dispatch(addItem({ ...product, id, quantity: quantity }))
      : dispatch(updateQuantity({ ...product, id, quantity: +quantity }));
  };

  useEffect(() => {
    fetch(`/product/by-product/${itemId}`)
      .then((res) => res.json())
      .then(({ product }) => {
        // console.log(product);
        setProduct(product);
      });
  }, []);

  return product ? (
    <Wrapper>
      <ProductName>{name}</ProductName>
      <ProductImg src={imageSrc} />
      <ProductInfoDiv>
        <ProductPrice>${price}</ProductPrice>
        {numInStock > 0 ? (
          <>
            <Amount
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              placeholder="1"
              min="1"
              max={product.numInStock}
            />
            <Button className="addToCart" onClick={handleAddToCart}>
              {!cartState[id] ? "Add to Cart" : "Update Cart"}
            </Button>

            <NumInStock>{numInStock} In Stock</NumInStock>
          </>
        ) : (
          <SoldOut>This item is currently out of stock</SoldOut>
        )}
        <Specs>
          <Company>
            Brand: <GoTo to={`/company/${companyId}}`}>{companyName}</GoTo>
          </Company>
          <BodyLocation>
            Body Location:{" "}
            <GoTo to={`/bodylocation/${body_location.toLowerCase()}`}>
              {body_location}
            </GoTo>
          </BodyLocation>
          <Category>Category: {category}</Category>
        </Specs>
      </ProductInfoDiv>
    </Wrapper>
  ) : (
    <div>loading</div>
  );
};

const Wrapper = styled.div`
  margin: 20px 100px;
  display: grid;
  padding-bottom: 50px;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100px auto;
  grid-template-areas:
    "name name"
    "image info";
`;
const ProductName = styled.h2`
  text-align: center;
  grid-area: name;
  font-size: 20px;
  margin: 30px calc(50vw - 320px);
  width: 500px;
`;

const ProductImg = styled.img`
  grid-area: image;
  border: 90px solid white;
  border-radius: 20px;
  margin-left: 10vw;
  width: 15vw;
`;

const ProductInfoDiv = styled.div`
  grid-area: info;
  padding: 50px 10px;
  line-height: 2em;
`;

const ProductPrice = styled.p``;

const Amount = styled.input`
  width: 30px;
  display: block;
  margin-bottom: 20px;
`;

const NumInStock = styled.p`
  padding-top: 10px;
  color: ${COLORS.accent};
  font-size: 14px;
`;

const BodyLocation = styled.p`
  font-size: 14px;
`;

const Category = styled.p`
  font-size: 14px;
`;

const Specs = styled.div`
  font-size: 14px;
  margin-top: 30px;
  border: 1px solid ${COLORS.accent};
  padding: 10px;
  border-radius: ${COLORS.borderRadius};
`;

const GoTo = styled(Link)`
  color: ${COLORS.accentdark};
  &:hover {
    text-decoration: underline;
    color: ${COLORS.accent};
  }
`;

const SoldOut = styled.div`
  color: darkred;
`;

const Company = styled.p`
  font-size: 14px;
`;

const Button = styled.button``;

export default ProductDetails;
