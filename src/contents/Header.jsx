import React from 'react';
import RemindingStockContainer from '../containers/Detail/RemindingStockContainer';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <img src="./images/logo.png" alt="Stock Flow" />
      </h1>
      <RemindingStockContainer />
    </header>
  );
}
