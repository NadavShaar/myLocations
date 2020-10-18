import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Checkbox as MUICheckbox, FormControlLabel } from '@material-ui/core';

const Checkbox = props => {

    const classes = useStyles(props);

    const {
        label,
        ...rest
    } = props;

    return <FormControlLabel className={classes.label} label={label} control={ <MUICheckbox className={classes.checkbox} { ...rest } /> } />
};

const useStyles = makeStyles((theme) => ({
    label: {
        "& .MuiTypography-root": {
            fontSize: 14,
            color: theme.palette.color3
        }
    },
    checkbox: {
        "& svg": {
            width: 18,
            height: 18,
            color: props => theme.palette[props.checked ? 'icon2' : 'icon1']
        }
    }
}));

export default Checkbox;