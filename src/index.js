import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import { ApolloProvider } from '@apollo/client';
import {pokeInfo} from './apis/baseUrl';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <ApolloProvider client={pokeInfo}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
);
