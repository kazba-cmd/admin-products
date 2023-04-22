import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from 'features/user/userSlice';

// material
import { alpha } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  Stack
} from '@material-ui/core';
// components
import MenuPopover from 'components/MenuPopover';
//
import account from '_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '#'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.userInfo.name);
  const surname = useSelector((state) => state.user.userInfo.surname);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => dispatch(clearUser());

  return (
    <>
      <Stack
        onClick={handleOpen}
        sx={{
          borderColor: (theme) => theme.palette.grey['500'],
          borderRadius: 1,
          margin: 0.5,
          padding: 1,
          paddingLeft: 3
        }}
      >
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack mt={1}>
            <Typography color="black" variant="subtitle2">
              {name} {surname?.substring(0, 1)}.
            </Typography>
          </Stack>
          <Stack>
            <IconButton
              ref={anchorRef}
              sx={{
                padding: 0,
                width: 40,
                height: 40,
                ...(open && {
                  '&:before': {
                    zIndex: 1,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    borderRadius: '10%',
                    position: 'absolute',
                    mt: 1,
                    bgcolor: (theme) => alpha(theme.palette.grey[700], 0.6)
                  }
                })
              }}
            >
              <Avatar
                src={account.photoURL}
                variant="rounded"
                alt="photoURL"
                sx={{ width: '40px', height: '40px', mt: 1 }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {name} {surname}
          </Typography>
        </Box>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
