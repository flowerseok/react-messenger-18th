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
  font-family: 'Pretendard', sans-serif;  /* or any font you prefer */
}

#app {  /* Assuming your root div has an id of "app" */
  width: 375px;
  height: 812px;
  margin: 0 auto;   /* Center the chatroom horizontally */
  background-color: white;
  overflow: hidden;  /* Ensures nothing overflows the specified dimensions */
}





`;

export default GlobalStyle;
