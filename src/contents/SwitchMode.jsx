import React, { useState } from 'react';
import { useEffect } from 'react';
import './SwitchMode.scss';

export default function SwitchMode() {
  const [modeCheck, setModeCheck] = useState(false);

  useEffect(() => {
    if (modeCheck) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
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
