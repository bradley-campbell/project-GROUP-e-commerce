import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item";

const Grid = ({ itemsData }) => {
  const [itemsView, setItemsView] = useState("all");
  const [itemsArray, setItemsArray] = useState(itemsData);

  useEffect(() => {
    itemsView === "all"
      ? setItemsArray(itemsData)
      : setItemsArray(itemsData.filter((item) => item.category === itemsView));
  }, [itemsView]);

  return (
    <Wrapper>
      <SelectView>
        <ViewOption onClick={() => setItemsView("all")}>All</ViewOption>
        <ViewOption onClick={() => setItemsView("Fitness")}>Fitness</ViewOption>
        <ViewOption onClick={() => setItemsView("Medical")}>Medical</ViewOption>
        <ViewOption onClick={() => setItemsView("Lifestyle")}>
          Lifestyle
        </ViewOption>
        <ViewOption onClick={() => setItemsView("Entertainment")}>
          Entertainment
        </ViewOption>
        <ViewOption onClick={() => setItemsView("Industrial")}>
          Industrial
        </ViewOption>
        <ViewOption onClick={() => setItemsView("Pets and Animals")}>
          Pets and Animals
        </ViewOption>
        <ViewOption onClick={() => setItemsView("Gaming")}>Gaming</ViewOption>
      </SelectView>
      <GridDisplay>
        {itemsArray ? (
          itemsArray
            .sort((a, b) => (a.numInStock > b.numInStock ? -1 : 1)) // sorts by numInStock, highest to lowest
            .map((item) => <Item item={item} />)
        ) : itemsData ? (
          itemsData
            .sort((a, b) => (a.numInStock > b.numInStock ? -1 : 1)) // sorts by numInStock, highest to lowest
            .map((item) => <Item item={item} />)
        ) : (
          <div>loading</div>
        )}
      </GridDisplay>
    </Wrapper>
  );
};

export default Grid;

const Wrapper = styled.div`
  margin: 50px 150px 50px 150px;
  min-height: 100vh;
  padding-top: 15px;
  border-radius: 5px;
`;

const SelectView = styled.div`
  width: 100%;
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

const GridDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
