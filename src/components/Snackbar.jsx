import React, { useEffect, useState } from 'react';
import { Snackbar as MuiSnack } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const Snackbar = props => {

    const [snackbarData, setSnackbarData] = useState(null); 

    useEffect(() => {
        window.addEventListener('displaySnackbar', getData);
        return () => { window.removeEventListener('displaySnackbar', getData) }
    }, [])

    const getData = (e) => {
        setSnackbarData(e.detail)
    }

    if(!snackbarData) return null;

    const { 
        open=false, 
        message='',
        type='success',
        duration=5000
    } = snackbarData;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarData({ ...snackbarData, open: false });
    };

    return (
        <MuiSnack key={message} open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                { message }
            </Alert>
        </MuiSnack>
    )
}

export default Snackbar;