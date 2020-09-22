import React, { useState } from 'react';
import { useEffect } from 'react';
import { getSwitchModeSagaActionCreator } from '../redux/modules/switchMode';
import './SwitchMode.scss';

export default function SwitchMode({ setLightMode }) {
  const [modeCheck, setModeCheck] = useState(false);

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
            setLightMode(localStorage.getItem('lightMode'))
          }}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
}
