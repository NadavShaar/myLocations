import React from 'react';
import TextField from './../materialUI/TextField';
import { makeStyles, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const Search = props => {

    const classes = useStyles();

    const {
        searchText,
        onSearchChange,
        label='Search',
        ...rest
    } = props;

    return (
        <TextField 
            label={label}
            className={classes.search}
            value={searchText}
            onChange={e => onSearchChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon className={classes.searchIcon} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <React.Fragment>
                        {
                            searchText ?
                                <InputAdornment position="end">
                                    <CloseIcon className={`${classes.clearIcon} ${classes.clickable}`} onClick={e => onSearchChange('')} />
                                </InputAdornment>
                                :
                                null
                        }
                    </React.Fragment>
                )
            }}
            { ...rest }
        />
    )
}

const useStyles = makeStyles((theme) => ({
    searchIcon: {
        fontSize: 20,
        color: theme.palette.color7,
    },
    clearIcon: {
        fontSize: 20,
        color: theme.palette.color3,
    },
    search: {
        marginBottom: 5,
        flex: 1,
        "& .MuiInput-underline:before": {
            borderColor: theme.palette.border2
        },
        "& .MuiInput-underline:after": {
            borderColor: theme.palette.secondary.main
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.color3
        },
        "& .MuiInputLabel-shrink": {
            transform: 'translate(0, 1.5px) scale(1)',
            fontSize: 14
        }
    },
    clickable: {
        cursor: 'pointer'
    }
}));

export default Search;