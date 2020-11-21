import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import { COLORS } from "../ConstantStyles";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const itemId = params.productId;

  console.log(itemId);

  useEffect(() => {
    fetch(`/product/by-product/${itemId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProduct(res);
      });
  }, []);

  console.log(product);

  return (
    <Wrapper>
      <ProductName>Moon Boot</ProductName>
      <ProductImg src="https://i.pinimg.com/564x/b4/d5/e8/b4d5e8d0200d6a5c046754413161db1c.jpg" />
      <ProductInfoDiv>
        <ProductPrice>$300,000.00</ProductPrice>
        <Amount type="number" placeholder="1" min="1" max="7" />
        <AddToCartBtn />
        <NumInStock>7 In Stock</NumInStock>
        <Specs>
          <BodyLocation>Body Location: Foot</BodyLocation>
          {/* link to items by body location */}
          <Category>Category: Space Apparel</Category>
          {/* link to items by category */}
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
  grid-area: name;
  font-size: 20px;
  margin: 30px calc(50vw - 150px);
  width: 300px;
`;

const ProductImg = styled.img`
  grid-area: image;
  border-radius: 20px;
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

export default ProductDetails;
