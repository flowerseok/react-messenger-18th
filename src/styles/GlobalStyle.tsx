import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: 'Pretendard', sans-serif;
}

#app {
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
}





`;

export default GlobalStyle;
