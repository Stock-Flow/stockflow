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
  const [menu, setMenu] = useState(true);

  const checkSearchDone = useCallback((menu) => {
    clearTimeout(searchDone.current);
    searchDone.current = setTimeout(() => {
      if (menu) {
        setStockSearch(searchValue.current.value);
      } else {
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
    <div className="sidebar">
      <Logo />

      <div className="menuBtn">
        <button
          className="stockBtn"
          onClick={() => {
            changeMode(true);
          }}
        >
          Stock
        </button>
        <button
          className="currencyBtn"
          onClick={() => {
            changeMode(false);
          }}
        >
          Currency
        </button>
      </div>

      <input
        className="search"
        type="text"
        onChange={() => {
          checkSearchDone(menu);
        }}
        ref={searchValue}
      />

      {/* <label htmlFor="sort-choice">Sort</label> */}
      <div>
        <FavoriteListContainer />
        <select className="sortBox" id="sort-chocie" onChange={selectedValue}>
          <option defaultValue="name">name</option>
          <option value="expensive">expensive</option>
          <option value="cheap">cheap</option>
        </select>
      </div>

      {/* {menu ? <StockListContainer search={search} sort={sort} /> : <CurrencyListContainer search={search} sort={sort} />}
    </div> */}
      <StockListContainer search={stockSearch} sort={sort} menu={menu} />
      <CurrencyListContainer search={currencySearch} sort={sort} menu={menu} />
    </div>
  );
}
