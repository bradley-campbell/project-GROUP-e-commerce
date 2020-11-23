import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { COLORS } from "./ConstantStyles";

const GlobalStyle = createGlobalStyle`

:root{
--white: "rgb(245, 244, 242)",
  --primary: "rgb(13, 62, 66)",
  --secondary: "rgb(184, 192, 245)",
  --accent: "rgb(173, 144, 127)",
  --button: "rgb(250, 220, 220)",
  --borderRadius: "10px",
}

${reset};

.addToCart{

border-radius: var(--borderRadius);
  color: var(--white);
  border: none;
  padding: 10px 17px;
  background: var(--primary);
  cursor: pointer;
  &:hover {
    background: var(--accent);
  }

  &:active {
    background: var(--secondary);
  }

}

body{
    font-family: 'Inter', sans-serif;
}

a{
    text-decoration: none;
}

`;

export default GlobalStyle;
