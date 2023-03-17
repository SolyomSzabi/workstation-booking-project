import * as React from 'react';

import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      onClick={e => e.stopPropagation()}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};