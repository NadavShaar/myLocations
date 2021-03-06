import React, { useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from './Button';
import useEventListener from './../../hooks/useEventListener';

const Confirm = props => {

    const classes = useStyles();

    const [confirmData, setConfirmData] = useState({open: false}); 

    const getData = (e) => setConfirmData({ ...e.detail, open: true });
    useEventListener('displayConfirm', getData);


    if(!confirmData) return null;

    const { 
        open=false,
        title='Attention!',
        description='',
        onSubmit,
        cancelLabel='Cancel',
        submitLabel='OK'
    } = confirmData;

    const handleClose = () => {
        setConfirmData({ ...confirmData, open: false });
    };

    const handleSubmit = () => {
        onSubmit();
        handleClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.description}>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">{cancelLabel}</Button>
                {
                    onSubmit ?
                        <Button onClick={handleSubmit} color="primary" autoFocus>{submitLabel}</Button>
                        :
                        null
                }
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles((theme) => ({
    description: {
        wordBreak: 'break-word'
    }
}));

export default Confirm;