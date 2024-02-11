
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage"


import logo from './logo.svg';
import './App.css';

const privateRoutes = [
  {
    path: "/",
    component: () => <HomePage />,
  },
  {
    path: "*",
    component: () => <HomePage />,
  },
];


// const publicRoutes = [
//   {
//     path: "/login",
//     component: () => <LoginPage />,
//   },
// ];


const App = () => {
  return (
     <HomePage/>
  );
};

export default App;
