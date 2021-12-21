import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./styles/index.css";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";

// Redux 관련 불러오기
import { Provider } from "react-redux"
import store from "./redux/configureStore"

ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
