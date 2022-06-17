import DeleteIcon from '@mui/icons-material/Delete';

import './action-item.styles.scss'

const ActionItem = () => {
    return (
        <>
            <span className='action-item'><DeleteIcon fontSize='small' sx={{ color: '#dc3545' }} /></span>
        </>
    )
}

export default ActionItem