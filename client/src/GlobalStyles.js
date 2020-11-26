import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { COLORS } from "./ConstantStyles";

const GlobalStyle = createGlobalStyle`

:focus{
 outline: none; 
}

${reset};

.addToCart{

border-radius: ${COLORS.borderRadius};
  color: ${COLORS.white};
  border: none;
  padding: 10px 17px;
  background: ${COLORS.primary};
  cursor: pointer;
  &:hover {
    background: ${COLORS.accent};
  }

  &:active {
    background: ${COLORS.accentdark};
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
