import React from "react";

import DjiagraphContainer from "../containers/MainDjia/djiagraphContainer";
import SideBarContent from "../contents/SideBarContent";
import './Home.scss'


export default function Home() {
  return (
    <div className='home'>
      <SideBarContent />
      <DjiagraphContainer />
    </div>
  );
}
