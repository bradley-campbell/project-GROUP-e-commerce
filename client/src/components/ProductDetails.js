import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import { COLORS } from "../ConstantStyles";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const params = useParams();
  const itemId = params.productId;

  console.log(itemId);

  useEffect(() => {
    fetch(`/product/by-product/${itemId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProduct(res.product);
      });
  }, []);

  console.log(product.name);

  return (
    <Wrapper>
      <ProductName>{product.name}</ProductName>
      <ProductImg src={product.imageSrc} />
      <ProductInfoDiv>
        <ProductPrice>${product.price}</ProductPrice>
        {product.numInStock > 0 ? (
          <>
            <Amount
              type="number"
              placeholder="1"
              min="1"
              max={product.numInStock}
            />

            <AddToCartBtn />
            <NumInStock>{product.numInStock} In Stock</NumInStock>
          </>
        ) : (
          <SoldOut>This item is currently out of stock</SoldOut>
        )}
        <Specs>
          <BodyLocation>Body Location: {product.body_location}</BodyLocation>
          <Category>Category: {product.category}</Category>
        </Specs>
      </ProductInfoDiv>
    </Wrapper>
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
  border: 1px solid ${COLORS.secondary};
  padding: 10px;
  border-radius: ${COLORS.borderRadius};
`;

const SoldOut = styled.div`
  color: darkred;
`;

export default ProductDetails;
