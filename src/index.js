import React from 'react';
import ReactDOM from "react-dom";
import './style.css';
import { Registration } from './registration';

function Index() {

    return (
      <Registration />
    );
  }

  ReactDOM.render(
    React.createElement(Index, null),
    document.getElementById('root')
  ); 
