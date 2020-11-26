import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import { COLORS } from "../../ConstantStyles";

const Grid = ({ itemsData, itemsView }) => {
  const [itemsArray, setItemsArray] = useState(itemsData);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(24);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let numOfPages = 0;
  const pages = [];
  const pageSize = 24;

  if (itemsArray.length > 0) {
    numOfPages = Math.ceil(itemsArray.length / pageSize);
  } else if (itemsArray.length === 0 && itemsData.length > 0) {
    numOfPages = Math.ceil(itemsData.length / pageSize);
  }

  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  console.log(currentPage);

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(24);
    setCurrentPage(1);
  }, [itemsView]);

  useEffect(() => {
    const itemsDisplayed = itemsData.slice(startIndex, endIndex);
    console.log(itemsDisplayed);
    setDisplayedItems(itemsDisplayed);
    window.scrollTo(0, 0);
  }, [startIndex, endIndex, itemsData]);

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
      {pages.length > 1 && (
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
                pageButtonColor={currentPage === page}
              >
                {page}
              </Page>
            );
          })}
          <Forward key={pages.length + 1} onClick={handleForward}>
            Forward
          </Forward>
        </Pagination>
      )}
    </Wrapper>
  );
};

export default Grid;

const Wrapper = styled.div`
  margin: 50px 150px 50px 150px;
  min-height: 100vh;
  padding-top: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
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

const Pagination = styled.div`
  margin-top: 25px;
`;

const Back = styled.button`
  color: ${COLORS.white};
  border: none;
  padding: 10px 17px;
  background: ${COLORS.primary};
  cursor: pointer;
  &:hover {
    background: ${COLORS.accent};
  }

  &:active {
    background: ${COLORS.secondary};
  }
`;

const Forward = styled.button`
  color: ${COLORS.white};
  border: none;
  padding: 10px 17px;
  background: ${COLORS.primary};
  cursor: pointer;
  &:hover {
    background: ${COLORS.accent};
  }

  &:active {
    background: ${COLORS.secondary};
  }
`;

const Page = styled.button`
  color: ${COLORS.white};
  border: none;
  padding: 10px 17px;
  background: ${(props) =>
    !props.pageButtonColor ? COLORS.primary : COLORS.accent};
  cursor: pointer;
  &:hover {
    background: ${COLORS.accent};
  }

  &:active {
    background: ${COLORS.secondary};
  }
`;
