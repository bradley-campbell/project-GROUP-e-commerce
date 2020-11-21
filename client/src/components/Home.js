import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Home = () => {
  const [randomItems, setRandomItems] = useState(""); // Setting this to state for now, however, we can decide if it should be added to store

  const handleFetch = async () => {
    try {
      let response = await fetch("/product/random"); // Tried fetching with number in body, produced an error - small change to endpoint
      response = await response.json();
      setRandomItems(response.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <Grid items={randomItems} />
    </div>
  );
};

export default Home;
