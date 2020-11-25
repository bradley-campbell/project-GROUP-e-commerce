import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";

import Grid from "./Grid";
import { COLORS } from "../ConstantStyles";

const Home = () => {
  const history = useHistory();

  const [randomItems, setRandomItems] = useState(""); // Setting this to state for now, however, we can decide if it should be added to store

  const handleFetch = async () => {
    try {
      let response = await fetch("/product/random/10"); // Tried fetching with number in body, produced an error - small change to endpoint
      response = await response.json();
      setRandomItems([...response.products]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    randomItems && (
      <AutoSlider>
        <SliderContent>
          {randomItems.map((item) => {
            return (
              <SliderBox>
                <Slider>
                  <PicArea>
                    <Image src={item.imageSrc} height="240px" />
                  </PicArea>
                  <Info>
                    <Company
                      onClick={() => {
                        history.push(`/company/${item.companyId}`);
                      }}
                    >
                      {item.companyName}
                    </Company>
                    {item.name}
                    <Button
                      onClick={() => {
                        history.push(`/product/${item.id}`);
                      }}
                    >
                      Shop Now
                    </Button>
                  </Info>
                </Slider>
              </SliderBox>
            );
          })}
        </SliderContent>
      </AutoSlider>
    )
  );
};

const AutoSlider = styled.div`
  margin: 100px 20vw;
  border-radius: 10px;
  box-sizing: border-box;
  width: 800px;
  height: 320px;
  box-shadow: -2px 4px 15px 0px rgba(255, 255, 255, 0.3);
  background-color: white;
  overflow-x: hidden;
`;

const Slide = keyframes`
	  10%{
			transform:translateX(0);
		  }
		14%,20%{
			transform:translateX(-820px);
		  }
		24%, 30%{
			transform:translateX(-1620px);
		  }
	34%, 40%{
			transform:translateX(-2420px);
		  }
     44%, 50%{
			transform:translateX(-3220px);
		  }
    54%, 60%{
			transform:translateX(-4020px);
		  }
     64%, 70%{
			transform:translateX(-4820px);
		  }
   74%, 80%{
			transform:translateX(-5620px);
		  }
    84%,  90%{
			transform:translateX(-6420px);
		  }
	99%,100%{
			transform:translateX(0);
		  }
`;

const SliderContent = styled.ul`
  margin: 0;

  box-sizing: border-box;
  list-style: none;
  display: flex;
  animation: 35s ${Slide} ease-in-out infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const SliderBox = styled.li`
  box-sizing: border-box;
  width: 700px;
  height: 300px;
  display: block;
  margin: 10px 80px 0px 20px;
  font-size: 18px;
`;

const Slider = styled.div`
  margin: 0;
  margin-top: -20px;

  box-sizing: border-box;
  height: 330px;
  width: 800px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-areas: "pic info";
`;

const PicArea = styled.div`
  grid-area: pic;
`;

const Info = styled.div`
  grid-area: info;
  margin: 0;

  background: linear-gradient(
    109deg,
    rgba(255, 255, 255, 1) 20%,
    rgba(247, 247, 247, 1) 40%,
    rgba(181, 181, 181, 0.9868989832261029) 100%
  );

  padding: 50px 30px 20px 20px;
`;

const Image = styled.img`
  padding: 30px 0 0 30px;
  object-fit: cover;
`;

const Button = styled.button`
  background: ${COLORS.accent};
  display: block;
  border: none;
  cursor: pointer;
  margin: 100px 0 0 300px;
  color: white;
  border-radius: ${COLORS.borderRadius};
  padding: 10px 17px;
  box-shadow: 0px 0px 15px 0px white;
  &:hover {
    background: ${COLORS.primary};
  }
`;

const Company = styled.h3`
  font-size: 25px;
  color: grey;
  margin-bottom: 30px;
  cursor: pointer;
`;

export default Home;
