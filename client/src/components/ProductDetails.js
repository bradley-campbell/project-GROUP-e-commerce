import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const itemId = params.itemId;

  // useEffect(() => {
  //   fetch(`/product/${productId}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setProduct(res);
  //     });
  // });

  return (
    <Wrapper>
      <ProductName>Moon Boot</ProductName>
      <ProductImg src="https://i.pinimg.com/564x/b4/d5/e8/b4d5e8d0200d6a5c046754413161db1c.jpg" />
      <ProductInfoDiv>
        <ProductPrice>$300,000.00</ProductPrice>
        <Amount type="number" placeholder="1" min="1" max="7" />
        <AddBtn>add to cart</AddBtn>
        <NumInStock>7 In Stock</NumInStock>
        <BodyLocation>Body Location: Foot</BodyLocation>
        <Category>Category: Space Apparel</Category>
      </ProductInfoDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 100px;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100px auto;
  grid-template-areas:
    "name name"
    "image info";
`;
const ProductName = styled.h1`
  grid-area: name;
  margin: auto;
`;

const ProductImg = styled.img`
  grid-area: image;
  border-radius: 20px;
`;

const ProductInfoDiv = styled.div`
  grid-area: info;
`;

const ProductPrice = styled.p``;

const Amount = styled.input`
  width: 30px;
  display: block;
  margin-bottom: 20px;
`;

const AddBtn = styled.button`
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  background: black;
  color: white;
  cursor: pointer;
  &:hover {
    background: pink;
  }
`;

const NumInStock = styled.p``;

const BodyLocation = styled.p``;

const Category = styled.p``;

export default ProductDetails;
