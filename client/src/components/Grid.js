import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item";

const Grid = ({ itemsData }) => {
  const [itemsView, setItemsView] = useState("all");
  const [itemsArray, setItemsArray] = useState(itemsData);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(25);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let numOfPages = 0;
  const pages = [];
  const pageSize = 25;

  console.log(itemsView);

  if (itemsArray.length > 0) {
    numOfPages = Math.ceil(itemsArray.length / pageSize);
  } else if (itemsArray.length === 0 && itemsData.length > 0) {
    numOfPages = Math.ceil(itemsData.length / pageSize);
  }

  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    // itemsView === "all"
    //   ? setItemsArray(itemsData)
    //   : setItemsArray(itemsData.filter((item) => item.category === itemsView));
    if (itemsView === "all") {
      const itemsDisplayed = itemsData.slice(startIndex, endIndex);
      setItemsArray(itemsData);
      setDisplayedItems(itemsDisplayed);
    } else {
      const categoryItems = itemsData.filter(
        (item) => item.category === itemsView
      );
      console.log(categoryItems);
      const itemsDisplayed = itemsData.slice(startIndex, endIndex);
      setItemsArray(categoryItems);
      setDisplayedItems(itemsDisplayed);
    }
  }, [itemsView, startIndex, endIndex]);

  const handleBack = () => {
    if (currentPage > 1) {
      setStartIndex(startIndex - pageSize);
      setEndIndex(endIndex - pageSize);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleForward = () => {
    if (currentPage < pages.length) {
      setStartIndex(startIndex + pageSize);
      setEndIndex(endIndex + pageSize);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePage = (page) => {
    setStartIndex((page - 1) * pageSize);
    setEndIndex(page * pageSize);
    setCurrentPage(page);
  };

  return (
    <Wrapper>
      <Pagination>
        <Back key="0" onClick={handleBack}>
          Back
        </Back>
        {pages.map((page) => {
          return (
            <Page
              key={page}
              onClick={() => {
                handlePage(page);
              }}
            >
              {page}
            </Page>
          );
        })}
        <Forward key={pages.length + 1} onClick={handleForward}>
          Forward
        </Forward>
      </Pagination>
      {/* <SelectView>
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
      </SelectView> */}
      <GridDisplay>
        {displayedItems ? (
          displayedItems
            .sort((a, b) => (a.numInStock > b.numInStock ? -1 : 1)) // sorts by numInStock, highest to lowest
            .map((item) => <Item item={item} key={item.id} />)
        ) : itemsData ? (
          itemsData
            .sort((a, b) => (a.numInStock > b.numInStock ? -1 : 1)) // sorts by numInStock, highest to lowest
            .map((item) => <Item item={item} key={item.id} />)
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

const Pagination = styled.div``;

const Back = styled.button``;

const Forward = styled.button``;

const Page = styled.button``;
