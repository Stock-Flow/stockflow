import React from 'react'
import { useSelector } from 'react-redux'


export default function CurrencyList() {
  const currencys = useSelector(state => state.sideBarCurrency)
  console.log(currencys)
  return (
    <ul>
      <li>{currencys}</li>
    </ul>
  )
}