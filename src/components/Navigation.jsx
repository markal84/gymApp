import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Divider
} from '@mui/material'
import { useTheme } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { PropTypes } from 'prop-types'
//import ThemeSwitch from './ThemeSwitch'

export default function Nav({ user, setUser, setMessage }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    if (
      !user &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/')
    }
  }, [user, location.pathname, navigate])

  function handleMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleLogout() {
    try {
      window.localStorage.removeItem('loggedWorkoutAppUser')
      setUser(null)
      navigate('/')
      setMessage('You successfully logged out')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}
      >
        {user && (
          <>
            <AppBar position="static">
              <Toolbar
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  component={RouterLink}
                  to="/workouts"
                  variant="text"
                  sx={{
                    color:
                      theme.palette.mode === 'light' ? '#ffffff' : '#90caf9'
                  }}
                >
                  Workouts
                </Button>
                <Box component="nav" display="flex">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={RouterLink}
                      to="/account"
                      sx={{ padding: '0.5rem 1rem' }}
                    >
                      <ListItemText style={{ textAlign: 'center' }}>
                        Account
                      </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      component={RouterLink}
                      to="/workouts"
                      sx={{ padding: '0.5rem 1rem' }}
                    >
                      <ListItemText style={{ textAlign: 'center' }}>
                        Workouts
                      </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ padding: '0.5rem 1 rem' }}
                    >
                      <ListItemText style={{ textAlign: 'center' }}>
                        Logout
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>
          </>
        )}
      </Box>
    </nav>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
