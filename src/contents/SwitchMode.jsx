import React, { useState } from 'react';
import { useEffect } from 'react';
import { getSwitchModeSagaActionCreator } from '../redux/modules/switchMode';
import './SwitchMode.scss';

export default function SwitchMode() {
  const [modeCheck, setModeCheck] = useState(false);
  localStorage.setItem('lightMode', JSON.stringify(modeCheck));
  useEffect(() => {
    localStorage.setItem('lightMode', JSON.stringify(modeCheck));
  }, [modeCheck]);

  return (
    <div className="switch-mode-wrap">
      <label class="switch">
        <input
          type="checkbox"
          checked={modeCheck}
          onChange={() => {
            setModeCheck(!modeCheck);
          }}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
}
