import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserPage from "./components/UserProfil/UserPage.jsx";
import ForumMainPage from "./components/Forum/ForumMainPage.jsx";
import CategoriesComponent from "./components/Forum/CategoriesComponent.jsx";
import TopicsComponent from "./components/Forum/TopicsComponent.jsx";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/acceuil" element={<App/>}/>
            <Route path="/userprofil" element={<UserPage/>}/>
            <Route path="/forum/categories" element={<ForumMainPage/>}/>
            <Route path="/forum/category/:id/:category/topics" element={<CategoriesComponent/>}/>
            <Route path="forum/category/:categoryId/:category/topic/:id/:topic" element={<TopicsComponent/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
//reportWebVitals(console.log)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//</Route>
//</Route>

reportWebVitals();
