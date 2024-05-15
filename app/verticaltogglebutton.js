import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import RotateRightIcon from '@mui/icons-material/RotateRight';
import BlockIcon from '@mui/icons-material/Block';

export default function VerticalToggleButtons() {
  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="list" aria-label="list">
        <RotateRightIcon />
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <BlockIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}