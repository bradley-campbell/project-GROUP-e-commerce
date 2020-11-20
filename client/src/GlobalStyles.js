import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


:root{

    --navColor: #011627;  // Rich Black
    --mainBackground: #AA6373; // Rose Dust
    --shadow: #EDC79B; // Gold Crayola
    --productBackground: #9FC490; // Dark Sea Green
     



}

*{
    font-family: 'Inter', sans-serif;
}




h1, h2 ,h3, p{
    color: #AEC5EB;
}

nav{
    background-color: var(--navColor);
}










`;

export default GlobalStyle;
