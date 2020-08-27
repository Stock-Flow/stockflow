import React, { useRef, useState, useCallback } from 'react';
import SideBarContent from '../../components/SideBar/SideBarContent';
export default function SideBarContentContainer() {

  let searchValue = useRef();
  let searchDone = useRef();
  const [search, setSearch] = useState('')

  const checkSearchDone = useCallback((e) => {
    clearTimeout(searchDone.current);
    searchDone.current = setTimeout(() => {
      setSearch(searchValue.current.value);
    }, 1000)
  }, [])
  return (
    <>
      <input type="text" onChange={checkSearchDone} ref={searchValue} />
      <SideBarContent search={search} />
    </>
  )
}