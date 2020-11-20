import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


:root{

    --navColor: #011627;  // Rich Black
    --mainBackground:  #EDC79B; // Gold Crayola
    --accent:  #AA6373; // Rose Dust
    --productBackground: #9FC490; // Dark Sea Green
    --mainText : #AEC5EB

}

*{
    font-family: 'Inter', sans-serif;
}

h1, h2 ,h3, p{
    color: var(--mainText);
}

nav{
    background-color: var(--navColor);
}

body{
    background-color: var(--mainBackground)
}


`;

export default GlobalStyle;
