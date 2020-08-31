import React, { useRef, useState, useCallback } from 'react';
import Search from './Search';
import StockListContainer from '../../containers/SideBar/StockListContainer';
import CurrencyListContainer from '../../containers/SideBar/CurrencyListContainer';

export default function SideBarContent() {
  const searchValue = useRef();
  const searchDone = useRef();
  const [sort, setSort] = useState('name');
  const [search, setSearch] = useState('')
  const [menu, setMenu] = useState('stock')

  const checkSearchDone = useCallback((e) => {
    clearTimeout(searchDone.current);
    searchDone.current = setTimeout(() => {
      setSearch(searchValue.current.value);
    }, 1000)
  }, [])

  const selectedValue = useCallback((e) => {
    setSort(e.target.value);
  }, [])
  return (
    <>
      <label htmlFor="sort-choice">Sort</label>
      <select id="sort-chocie" onChange={selectedValue}>
        <option defaultValue="name" >name</option>
        <option value="expensive">expensive</option>
        <option value="cheap">cheap</option>
      </select>
      <input type="text" onChange={checkSearchDone} ref={searchValue} />
      <StockListContainer search={search} sort={sort} />
      <CurrencyListContainer sort={sort} />
    </>
  )
}