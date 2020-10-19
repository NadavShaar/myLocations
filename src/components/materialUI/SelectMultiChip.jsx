import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const SelectMultiChip = props => {

    const classes = useStyles();

    const {
        label='',
        placeholder='Select',
        handleChange,
        selectedOptions=[],
        options=[],
        getFormattedChipLabel,
        classesExtension
    } = props;

    return (
        <FormControl className={`${classes.root} ${classesExtension.root}`.trim()}>
            <span className={classes.selectLabel}>{label}</span>
            <Select
                multiple
                value={selectedOptions}
                onChange={e => handleChange(e.target.value)}
                className={classes.input}
                input={<Input disableUnderline={true} placeholder={placeholder} />}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {
                            selected.map((value) => (
                                <Chip key={value} label={getFormattedChipLabel?.(value) || value} className={classes.chip} />
                            ))
                        }
                    </div>
                )}
            >
                {
                    options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        width: '100%',
        "& .MuiSelect-icon": {
            right: 14,
            color: theme.palette.icon1
        },
        "& .MuiSelect-select:focus": {
            backgroundColor: 'transparent'
        }
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    input: {
        minHeight: 60,
        background: theme.palette.background1,
        maxWidth: 400,
        width: '100%',
        borderRadius: 4,
        boxShadow: theme.shadow.insetShadow1,
        "& .MuiSelect-select.MuiSelect-select": {
            paddingLeft: 10
        },
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 24
        },
        "& .MuiInputBase-input": {
            textAlign: 'center'
        },
    },
    selectLabel: {
        padding: '7px 0',
        color: theme.palette.color4,
        fontSize: 18
    }
}));

export  default SelectMultiChip;