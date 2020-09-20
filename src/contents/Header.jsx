import React from 'react';
import RemindingStockContainer from '../containers/Detail/RemindingStockContainer';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../redux/modules/selectedStock';
import { useCallback } from 'react';


export default function Header() {

  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(getSelectedStockSagaActionCreator('',''))
  }
  return (
    <header className="header">
      <h1 className="logo" onClick={goHome}>
        <img src="./images/logo.png" alt="Stock Flow" />
      </h1>
      <RemindingStockContainer />
    </header>
  );
}
