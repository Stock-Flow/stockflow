import React from 'react'
import Currency from '../../components/SideBar/Currency'
import { useDispatch } from 'react-redux';
import { getSideBarCurrencySagaActionCreator } from '../../redux/modules/sidebarCurrency';


export default function CurrencyContainer() {
  const dispatch = useDispatch();

  const renderCurrencyList = () => {
    //미들웨어(saga호출)
    dispatch(getSideBarCurrencySagaActionCreator())
    //액션이 start로 바뀐다.
    //필요한 디지털화폐 데이터를 get해온다
    //데이터를 기다릴때 액션이 loading 실패시 fail
    //reducer에서 가져온 데이터를 redux store에 저장
  };


  return (
    <Currency renderCurrencyList={renderCurrencyList} />
  )
}