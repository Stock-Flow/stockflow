import React, { useCallback } from 'react';
import CurrencyList from '../../components/SideBar/CurrencyList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSideBarCurrencySagaActionCreator } from '../../redux/modules/sidebarCurrency';
import SearchService from '../../services/SearchService';

export default function CurrencyListContainer({ search, sort, menu, toggleMenu, toggleMobile }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.sidebarCurrency.loading);
  let currencyList = useSelector(
    (state) => state.sidebarCurrency.sideBarCurrency,
  );

  if (currencyList.length !== 0) {
    if (search) {
      currencyList = SearchService.searchingCurrencyList(search, currencyList)
      console.log(currencyList)
    }
    if (sort === 'name') {
      currencyList = [...currencyList].sort((a, b) =>
        a.name >
          b.name
          ? 1
          : a.name <
            b.name
            ? -1
            : 0,
      );
    } else if (sort === 'cheap') {
      currencyList = [...currencyList].sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === 'expensive') {
      currencyList = [...currencyList].sort((a, b) => b.price - a.price);
    }
  }

  const renderCurrencyList = useCallback(() => {
    dispatch(getSideBarCurrencySagaActionCreator());
  }, [dispatch]);


  return (
    <>
      <CurrencyList
        currencyList={currencyList}
        renderCurrencyList={renderCurrencyList}
        menu={menu}
        loading={loading}
        toggleMenu={toggleMenu}
        toggleMobile={toggleMobile}
      />
    </>
  );
}
