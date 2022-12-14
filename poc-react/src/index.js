import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Applayout from './App';
import './app.css';









export default function App() {
  return (
    <BrowserRouter>
    <Applayout/>
  </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);