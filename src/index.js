import React from 'react';
import ReactDOM from 'react-dom/client';
import  { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddBook from './pages/AddBook';
import Details from './pages/Details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Toaster/>
  <Routes>
    <Route index element={<App/>}/>
    <Route path='/add' element={<AddBook/>}/> 
    <Route path='/books/:_id' element={<Details/>} />
  </Routes>
  </BrowserRouter>
);
