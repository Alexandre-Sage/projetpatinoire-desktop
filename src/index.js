import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserPage from "./components/UserProfil/UserPage.jsx";
import ForumMainPage from "./components/Forum/ForumMainPage.jsx";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}/>
              <Route path="/userprofil" element={<UserPage/>}/>
              <Route path="/forum" element={<ForumMainPage/>}/>
          </Routes>
      </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
