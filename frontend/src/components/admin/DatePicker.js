import React from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

export default function DatePickers({setDate}) {
  const [value, setValue] = React.useState(dayjs);

  const handleChange = (newValue) => {
    setValue(newValue);
    setDate(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params}
            sx={{ width: 200 }} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};