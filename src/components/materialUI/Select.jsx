import React from 'react';
import { makeStyles, Select as MUISelect, InputLabel, MenuItem, FormControl } from '@material-ui/core';

const Select = props => {

    const classes = useStyles();

    const {
        label='',
        options=[],
        value,
        onSelectioChange
    } = props;

    return (
        <FormControl className={classes.root}>
            { label ? <InputLabel>{label}</InputLabel> : null }
            <MUISelect
                value={value}
                onChange={e => onSelectioChange(e.target.value)}
            >
                { options.map((option, idx) => <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>) }
            </MUISelect>
        </FormControl>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        "& .MuiInput-underline:before": {
            borderColor: theme.palette.border2
        },
        "& .MuiInput-underline:after": {
            borderColor: theme.palette.secondary.main
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.color5
        },
        "& .MuiInput-root": {
            fontSize: 14,
            color: theme.palette.color7
        },
        "& .MuiSelect-icon": {
            color: theme.palette.icon1
        },
        "& .MuiSelect-root": {
            fontWeight: 500
        }
    }
}));

export default Select;