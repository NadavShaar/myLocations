import React from 'react';
import TextField from './../materialUI/TextField';
import { makeStyles, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const Search = props => {

    const classes = useStyles();

    const {
        value,
        onChange,
        label='Search',
        searchText,
        setSearchText 
    } = props;

    return (
        <TextField 
            label={label}
            className={classes.search}
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon className={classes.icon} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <React.Fragment>
                        {
                            searchText ?
                                <InputAdornment position="end">
                                    <CloseIcon className={`${classes.icon} ${classes.clickable}`} onClick={e => setSearchText('')} />
                                </InputAdornment>
                                :
                                null
                        }
                    </React.Fragment>
                )
            }}
            { ...props }
        />
    )
}

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: 20
    },
    search: {
        marginBottom: 10,
        "& .MuiInput-underline:after": {
            borderColor: theme.palette.secondary.main
        }
    },
    clickable: {
        cursor: 'pointer'
    }
}));

export default Search;