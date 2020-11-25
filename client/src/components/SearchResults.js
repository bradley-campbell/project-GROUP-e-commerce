import React, { useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchResults = () => {
  const { searchWord } = useParams();
  const [p, setP] = useState(null);
  const [nP, setNP] = useState(0);
  const [sw, setSW] = useState("");

  useEffect(() => {
    // it's safer to fetch data in the searchResults component
    fetch(`/product/search/?search=${searchWord}`) // sending info to backend by params
      .then((data) => data.json())
      .then((data) => {
        const { numProducts, products } = data;
        setP(products);
        setNP(numProducts);
        setSW(searchWord);
      });
  }, []);

  return p ? (
    <SearchWrpper>
      {nP > 0 ? (
        <SearchPositive>{`We found ${nP} product${
          nP > 1 ? "s" : ""
        } related to '${sw}': `}</SearchPositive>
      ) : (
        <SearchPositive>{`Sorry We didn't find anything related to '${sw}', do you want to see something else? Please see our list of products: `}</SearchPositive>
      )}
      <Grid itemsData={p} />
    </SearchWrpper>
  ) : (
    <SearchWrpper>Loading...</SearchWrpper>
  );
};

export default SearchResults;

const SearchWrpper = styled.div`
  margin-top: 30px;
  color: gray;
  width: 100%;
  text-align: center;
`;
const SearchPositive = styled.div``;
