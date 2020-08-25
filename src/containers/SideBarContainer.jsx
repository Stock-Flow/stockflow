import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDJIASagaActionCreator } from '../redux/modules/djia';
import SideBar from '../components/SideBar';

export default function SideBarContainer() {
  const djia = useSelector(state => state.djia.djia);
  const loading = useSelector(state => state.djia.loading);
  const djiaValue = djia.map(item => {
    return item["Time Series (Daily)"]
  })


  const dispatch = useDispatch();
  const getDjia = React.useCallback(() => {
    dispatch(getDJIASagaActionCreator());
  }, [dispatch])

  return <SideBar getDjia={getDjia} djiaValue={djiaValue} loading={loading} />
}