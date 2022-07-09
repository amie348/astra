import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { currentUserSelector } from '../../store/user/user.selectors';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../store/user/user.action'
import { setIsProfileDropDownOpen } from '../../store/dashboard/dashboard.action'
import './profile-dropdown.styles.scss'
import { margin } from '@mui/system';

const resetUser = {
    user: {},
    accessToken: ''
}

const ProfileDropDown = () => {

    const { user } = useSelector(currentUserSelector)
    const { name, role } = user

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton

                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: '#dc3545' }}>{name[0].toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu

                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}

                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: '230px',
                        overflow: 'hidden',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 28,
                            height: 28,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='dropdown-user-details-container'>
                    <span className='dropdown-user-name'>{name}</span>
                    <p className='dropdown-user-role'>({role})</p>
                </div>
                <Divider />
                <MenuItem sx={{ margin: '10px 0px' }}>
                    <Avatar /> My Profile
                </MenuItem>
                <hr style={{ marginTop: '0px', marginBottom: '8px' }} />
                <MenuItem onClick={() => {
                    dispatch(setIsProfileDropDownOpen(false))
                    dispatch(setCurrentUser(resetUser))
                    navigate('/')
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
{/* <div className="profile-dropdown-container">
            <button className="btn btn-danger" onClick={() => {
                dispatch(setIsProfileDropDownOpen(false))
                dispatch(setCurrentUser(resetUser))
                navigate('/')
            }}>
                Logout
            </button>
        </div> */}
export default ProfileDropDown
