import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import './spinner.styles.scss'

export default function Spinner() {
    return (
        <CircularProgress size={`15px`} sx={{ color: `white`, margin: `6px 20px` }} />
    );
}
