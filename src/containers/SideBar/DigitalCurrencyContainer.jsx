import React from 'react'
import DigitalCurrency from '../../components/SideBar/DigitalCurrency'
import { useDispatch } from 'react-redux';


export default function DigitalCurrencyContainer() {
  const dispatch = useDispatch();

  const renderDigitalCurrencyList= () => {
    dispatch()
  };
  // const renderDigitalCurrencyList = React.useCallback(() => {
  //   dispatch();
  // }, [dispatch])
  return (
    <DigitalCurrency renderDigitalCurrencyList={renderDigitalCurrencyList}/>
  )
}