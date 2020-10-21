import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from './';

const ChipInput = props => {

    const classes = useStyles();

    const {
        label='',
        placeholder='Search...',
        handleChange,
        selectedOptions=[],
        options=[],
        getFormattedSelectedOption,
        
    } = props;

    return (
        <FormControl className={classes.root}>
            <span className={classes.autoCompleteLabel}>{label}</span>
            <Autocomplete
                multiple
                openOnFocus
                className={classes.root}
                options={options}
                getOptionLabel={option => option.name}
                getOptionSelected={getFormattedSelectedOption}
                value={selectedOptions}
                onChange={(e, value, reason) => handleChange(value)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{ ...params.InputProps, disableUnderline: true }}
                        className={classes.input}
                        label=""
                        placeholder={placeholder}
                    />
                )}
            />
        </FormControl>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        "& .MuiAutocomplete-endAdornment": {
            right: 10
        },
        "& .MuiAutocomplete-popupIndicator .MuiSvgIcon-root, .MuiAutocomplete-clearIndicator": {
            color: theme.palette.icon1
        }
    },
    input: {
        minHeight: 60,
        background: theme.palette.background1,
        width: '100%',
        borderRadius: 4,
        boxShadow: theme.shadow.insetShadow1,
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 16,
            padding: '11px 60px 11px 10px'
        },
        "& .MuiChip-root": {
            background: theme.palette.primary.main,
            color: theme.palette.color1,
            boxShadow: theme.shadows[2]
        },
        "& .MuiChip-label": {
            fontWeight: 500
        },
        "& .MuiChip-deleteIcon": {
            color: theme.palette.icon4
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: 98
        }
    },
    autoCompleteLabel: {
        padding: '7px 0',
        color: theme.palette.primary.main,
        fontSize: 18
    }
}));

export  default ChipInput;