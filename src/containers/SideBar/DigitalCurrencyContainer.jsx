import React from 'react'
import DigitalCurrency from '../../components/SideBar/DigitalCurrency'
import { useDispatch } from 'react-redux';
import { sideBarDigitalCurrencySaga } from '../../redux/modules/sidebarDigitalCurrency';


export default function DigitalCurrencyContainer() {
  const dispatch = useDispatch();
  
  //useSelector로 redux의 저장된 값을 가져와서 props로 컴포넌트에 넘긴다.

  const renderDigitalCurrencyList= () => {
    //미들웨어(saga호출)
    dispatch(sideBarDigitalCurrencySaga)
    //액션이 start로 바뀐다.
    //필요한 디지털화폐 데이터를 get해온다
    //데이터를 기다릴때 액션이 loading 실패시 fail
    //reducer에서 가져온 데이터를 redux store에 저장
  };
  return (
    <DigitalCurrency renderDigitalCurrencyList={renderDigitalCurrencyList} digitalCurrencys={digitalCurrencys}/>
  )
}