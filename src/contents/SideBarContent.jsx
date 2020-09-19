import React, { useRef, useState, useCallback } from 'react';
import StockListContainer from '../containers/SideBar/StockListContainer';
import CurrencyListContainer from '../containers/SideBar/CurrencyListContainer';
import Logo from '../components/SideBar/Logo';
import './SideBarContent.scss';
import FavoriteListContainer from '../containers/SideBar/favoriteListContainer';

export default function SideBarContent() {
  const searchValue = useRef();
  const searchDone = useRef();
  const [sort, setSort] = useState('name');
  const [stockSearch, setStockSearch] = useState('');
  const [currencySearch, setCurrencySearch] = useState('');
  const [menu, setMenu] = useState('stock');

  const checkSearchDone = useCallback((menu) => {
    clearTimeout(searchDone.current);
    searchDone.current = setTimeout(() => {
      if (menu === 'stock') {
        setStockSearch(searchValue.current.value);
      } else if (menu === 'currency') {
        setCurrencySearch(searchValue.current.value);
      }
    }, 1500);
  }, []);

  const selectedValue = useCallback((e) => {
    setSort(e.target.value);
  }, []);

  const changeMode = useCallback((e) => {
    setMenu(e);
    searchValue.current.value = '';
    setStockSearch('');
    setCurrencySearch('');
  }, []);

  return (
    <div className="sidebar-wrap">
      <div className="menuBar">
        <button className="home-button">
          <img src="./images/home.png" alt="home" />
        </button>
        <button
          className="stockBtn"
          onClick={() => {
            changeMode('stock');
          }}
        >
          <img src="./images/chartarrow.png" alt="home" />
        </button>

        <button
          className="currencyBtn"
          onClick={() => {
            changeMode('currency');
          }}
        >
          <img src="./images/currency-icon.png" alt="home" />
        </button>

        <button
          className="favorite-button"
          onClick={() => {
            changeMode('favorite');
          }}
        >
          <img src="./images/star-click-icon.png" alt="home" />
        </button>

      </div>

      <div className="sidebarList">
        <input
          className="search"
          type="text"
          onChange={() => {
            checkSearchDone(menu);
          }}
          ref={searchValue}
        />

        <label htmlFor="sort-choice">Sort</label>

        <div className="sortbox-wrap clear-fix">
          <select className="sortbox" id="sort-chocie" onChange={selectedValue}>
            <option defaultValue="name">name</option>
            <option value="expensive">expensive</option>
            <option value="cheap">cheap</option>
          </select>
        </div>
        <StockListContainer search={stockSearch} sort={sort} menu={menu} />
        <CurrencyListContainer search={currencySearch} sort={sort} menu={menu} />
        <FavoriteListContainer menu={menu} />
      </div>
    </div>
  );
}