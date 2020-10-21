import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip as MUIChip } from '@material-ui/core';

const Chip = props => {

    const classes = useStyles();

    return (
        <MUIChip { ...props } className={classes.root} />
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.primary.main,
        color: theme.palette.color1,
        boxShadow: theme.shadows[2],
        minWidth: 60, 
        margin: '5px 10px 0 0',
        "& .MuiChip-label": {
            fontWeight: 500
        },
    }
}));

export default Chip;