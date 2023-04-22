import React from 'react';

import { OutlinedInput, InputAdornment, Box, IconButton } from '@material-ui/core';

import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

import { dumbFunc } from 'utils/helpers';

function SearchStyle({
  value,
  onChange = { dumbFunc },
  placeholder = 'Искать',
  onSearch = { dumbFunc },
  width = 280
}) {
  return (
    <OutlinedInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{ width }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={onSearch} edge="end" sx={{ mx: 1 }}>
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', my: 0.5 }} />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default SearchStyle;
