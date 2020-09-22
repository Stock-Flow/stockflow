import React, { useRef, useState, useCallback } from 'react';
import StockListContainer from '../containers/SideBar/StockListContainer';
import CurrencyListContainer from '../containers/SideBar/CurrencyListContainer';
import './SideBarContent.scss';
import FavoriteListContainer from '../containers/SideBar/favoriteListContainer';

export default function SideBarContent({ mobileMenu, toggleMobileMenu, scroll }) {
  const searchValue = useRef();
  const searchDone = useRef();
  const sideBarWrap = useRef();
  const [sort, setSort] = useState('name');
  const [stockSearch, setStockSearch] = useState('');
  const [currencySearch, setCurrencySearch] = useState('');
  const [menu, setMenu] = useState('stock');
  const [display, setDisplay] = useState(false);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  // img url 경로 state
  // const [homeImgUrl, setHomeImgUrl] = useState('./images/home-white.png');
  const [stockImgUrl, setStockImgUrl] = useState(
    './images/chartarrow-white.png',
  );
  const [currencyImgUrl, setCurrencyImgUrl] = useState(
    './images/currency-icon.png',
  );
  const [favoriteUrl, setFavoriteUrl] = useState(
    './images/star-click-icon.png',
  );

  // window.onresize = () => {
  //   setWindowWidth(window.innerWidth)
  // }

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
    // setHomeImgUrl('./images/home.png');
    setMenu(e);
    searchValue.current.value = '';
    setStockSearch('');
    setCurrencySearch('');

    if (e === 'stock') {
      setStockImgUrl('./images/chartarrow-white.png');
      setCurrencyImgUrl('./images/currency-icon.png');
      setFavoriteUrl('./images/star-click-icon.png');
    } else if (e === 'currency') {
      setStockImgUrl('./images/chartarrow.png');
      setCurrencyImgUrl('./images/currency-icon-white.png');
      setFavoriteUrl('./images/star-click-icon.png');
    } else if (e === 'favorite') {
      setStockImgUrl('./images/chartarrow.png');
      setCurrencyImgUrl('./images/currency-icon.png');
      setFavoriteUrl('./images/star-click-icon-white.png');
    } else {
      setStockImgUrl('./images/chartarrow-white.png');
    }
  }, []);

  // const goHome = () => {
  //   setHomeImgUrl('./images/home-white.png');
  //   setStockImgUrl('./images/chartarrow.png');
  //   setCurrencyImgUrl('./images/currency-icon.png');
  //   setFavoriteUrl('./images/star-click-icon.png');
  //   dispatch(getSelectedStockSagaActionCreator('', ''));
  // };

  const toggleMenu = () => {
    setDisplay(!display);
  };

  console.log(menu);
  return (
    <>

      <div className={`sidebar-wrap ${mobileMenu ? 'mobile-sidebar-show' : ''} ${scroll ? 'scroll-control' : ''}`} ref={sideBarWrap}>
        <nav className="menu-bar">
          <button className="toggle-menu" onClick={toggleMenu}>
            <img src="./images/toggle-menu.png" alt="menu" />
          </button>

          {/* <button className="home-button" onClick={goHome}>
            <img src={homeImgUrl} alt="home" />
          </button> */}

          <button
            className="stockBtn"
            onClick={() => {
              changeMode('stock');
            }}
          >
            <img src={stockImgUrl} alt="stock" />
          </button>

          <button
            className="currencyBtn"
            onClick={() => {
              changeMode('currency');
            }}
          >
            <img src={currencyImgUrl} alt="currency" />
          </button>

          <button
            className="favorite-button"
            onClick={() => {
              changeMode('favorite');
            }}
          >
            <img src={favoriteUrl} alt="favorite" />
          </button>

          <button className="mobile-close-button" onClick={toggleMobileMenu}>
            <img src="./images/closebutton.png" alt="mobile-close-button" />
          </button>
        </nav>

        <div className={`sidebarList ${display ? 'sidebarList-show' : ''} ${scroll ? 'scroll-control' : ''}`}>
          <input
            className="search"
            type="text"
            onChange={() => {
              checkSearchDone(menu);
            }}
            ref={searchValue}
            placeholder="Search"
          />

          {/* <label htmlFor="sort-choice">Sort</label>   */}

          <div className="sortbox-wrap clear-fix">
            <select
              className="sortbox"
              id="sort-chocie"
              onChange={selectedValue}
            >
              <option defaultValue="name">name</option>
              <option value="expensive">expensive</option>
              <option value="cheap">cheap</option>
            </select>
          </div>

          <div className="list-values">
            <span>Symbol</span>
            <span>Graph</span>
            <span>Price</span>
            <span>Change</span>
          </div>

          <StockListContainer
            search={stockSearch}
            sort={sort}
            menu={menu}
            toggleMenu={toggleMenu}
          />
          <CurrencyListContainer
            search={currencySearch}
            sort={sort}
            menu={menu}
            toggleMenu={toggleMenu}
          />
          <FavoriteListContainer menu={menu} toggleMenu={toggleMenu} />
          <button className="close-button" onClick={toggleMenu}>
            x
          </button>
        </div>
      </div>
    </>
  );
}