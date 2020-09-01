import React from 'react'


export default function Currency({renderCurrencyList}) {
  return (
    <button onClick={click}>currency</button>
  )

  function click() {
    renderCurrencyList()
  }
}