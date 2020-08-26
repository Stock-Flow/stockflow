import React from 'react'


export default function DigitalCurrency(renderDigitalCurrencyList) {
  return (
    <button onClick={click}>DigitalCurrency</button>
  )
  function click() {
    renderDigitalCurrencyList()
  }
}