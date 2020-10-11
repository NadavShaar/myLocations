import React from 'react';
import { Snackbar as MuiSnack } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { setSnackbarProps } from './../store/actions';

const Snackbar = props => {

    const dispatch = useDispatch();
    const snackbarState = useSelector(state => state.snackbar); 

    const { 
        open=false, 
        message='',
        type='success',
        duration=3000
    } = snackbarState;

    const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(setSnackbarProps({ ...snackbarState, open: false }));
    };

    return (
        <MuiSnack open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                { message }
            </Alert>
        </MuiSnack>
    )
}

export default Snackbar;