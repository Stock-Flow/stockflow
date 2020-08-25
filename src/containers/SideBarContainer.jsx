import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDJIASagaActionCreator } from '../redux/modules/djia';
import SideBar from '../components/SideBar';

export default function SideBarContainer() {
  const djia = useSelector(state => state.djia.djia);
  const djiaValue = djia.map(item => {
    return item["Time Series (Daily)"]
  })
  // const djiaYValue = djia.map(item => {
  //   return item["Time Series (Daily)]"]
  // })

  const dispatch = useDispatch();
  const getDjia = React.useCallback(() => {
    dispatch(getDJIASagaActionCreator());
  }, [dispatch])

  return <SideBar getDjia={getDjia} djiaValue={djiaValue} />
}