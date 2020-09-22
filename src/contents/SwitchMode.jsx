import React, { useState } from 'react';
import { useEffect } from 'react';
import { getSwitchModeSagaActionCreator } from '../redux/modules/switchMode';
import './SwitchMode.scss';

export default function SwitchMode({ setLightMode }) {
  if (!JSON.parse(localStorage.getItem('lightMode'))) {
    localStorage.setItem('lightMode', false);
  }
  const [modeCheck, setModeCheck] = useState(
    JSON.parse(localStorage.getItem('lightMode')),
  );

  useEffect(() => {
    localStorage.setItem('lightMode', modeCheck);
  }, [modeCheck]);

  return (
    <div className="switch-mode-wrap">
      <label class="switch">
        <input
          type="checkbox"
          checked={modeCheck}
          onChange={() => {
            setModeCheck(!modeCheck);
            // setLightMode(JSON.parse(localStorage.getItem('lightMode')));
            setLightMode(!modeCheck);
          }}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
}
