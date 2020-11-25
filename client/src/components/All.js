import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";

export const All = () => {
  const [items, setItems] = useState([]);
  const [itemsView, setItemsView] = useState("all");

  useEffect(() => {
    fetch(`/product/all`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.products);
      });
  }, []);

  useEffect(() => {
    const url =
      itemsView === "all"
        ? `/product/all`
        : `/product/by-category/${itemsView}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.products);
        setItems(res.products);
      });
  }, [itemsView]);

  console.log(itemsView);
  console.log(items);

  return (
    <Wrapper>
      <SelectView>
        <ViewOption onClick={() => setItemsView("all")}>All</ViewOption>
        <ViewOption onClick={() => setItemsView("fitness")}>Fitness</ViewOption>
        <ViewOption onClick={() => setItemsView("medical")}>Medical</ViewOption>
        <ViewOption onClick={() => setItemsView("lifestyle")}>
          Lifestyle
        </ViewOption>
        <ViewOption onClick={() => setItemsView("entertainment")}>
          Entertainment
        </ViewOption>
        <ViewOption onClick={() => setItemsView("industrial")}>
          Industrial
        </ViewOption>
        <ViewOption onClick={() => setItemsView("Pets and Animals")}>
          Pets and Animals
        </ViewOption>
        <ViewOption onClick={() => setItemsView("gaming")}>Gaming</ViewOption>
      </SelectView>
      <Grid itemsData={items} itemsView={itemsView} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectView = styled.div`
  margin-top: 50px;
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ViewOption = styled.button`
  padding: 15px;
  border: none;
  border-radius: 5px;
`;

export default All;
