import React from 'react';
import Logo from '../components/SideBar/Logo';
import SideBarContent from '../components/SideBar/SideBarContent';
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <Logo />
      <SideBarContent className={styles["SideBar"]}/>
    </>
  )
}