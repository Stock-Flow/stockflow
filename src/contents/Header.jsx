import React, { useState } from 'react';
import RemindingStockContainer from '../containers/Detail/RemindingStockContainer';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../redux/modules/selectedStock';
import { useCallback } from 'react';
// import ToggleMenuButton from './ToggleMenuButton'
import SideBarContent from './SideBarContent';

export default function Header({ toggleMobileMenu }) {
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(getSelectedStockSagaActionCreator('', ''));
  };
  return (
    <header className="header">
      <h1 className="logo" onClick={goHome}>
        <img src="./images/logo.png" alt="Stock Flow" />
      </h1>
      <div className="header-right">
        <RemindingStockContainer />
        <button className="toggle-menu" onClick={toggleMobileMenu}>
          <img src="./images/toggle-menu.png" alt="home" />
        </button>
      </div>
    </header>
  );
}
