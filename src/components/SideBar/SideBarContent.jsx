import React, { useRef, useState, useCallback } from 'react';
import StockListContainer from '../../containers/SideBar/StockListContainer';
import CurrencyListContainer from '../../containers/SideBar/CurrencyListContainer';

import styles from '../../App.scss'

export default function SideBarContent() {
  const searchValue = useRef();
  const searchDone = useRef();
  const [sort, setSort] = useState('name');
  const [search, setSearch] = useState('')
  const [menu, setMenu] = useState(true)

  const checkSearchDone = useCallback((e) => {
    clearTimeout(searchDone.current);
    searchDone.current = setTimeout(() => {
      setSearch(searchValue.current.value);
    }, 1500)
  }, [])

  const selectedValue = useCallback((e) => {
    setSort(e.target.value);
  }, [])

  const changeMode = useCallback((e) => {
    setMenu(e);
    searchValue.current.value = '';
    setSearch('');
  }, [])
  return (
    <div className={styles["SideBar"]}>
      <label htmlFor="sort-choice">Sort</label>
      <select id="sort-chocie" onChange={selectedValue}>
        <option defaultValue="name" >name</option>
        <option value="expensive">expensive</option>
        <option value="cheap">cheap</option>
      </select>
      <input type="text" onChange={checkSearchDone} ref={searchValue} />
      <button onClick={() => { changeMode(false) }}>Currency</button>
      <button onClick={() => { changeMode(true) }}>Stock</button>
      {menu ? <StockListContainer search={search} sort={sort} /> : <CurrencyListContainer search={search} sort={sort} />}
    </div>
  )
}