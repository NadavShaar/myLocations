import React from 'react';
import { Snackbar as MuiSnack} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Snackbar = props => {

    const { 
        open=false, 
        message='',
        type='success',
        duration=3000,
        onClose
    } = props;

    const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        onClose();
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