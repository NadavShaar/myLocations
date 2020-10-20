import React from 'react';
import { makeStyles } from '@material-ui/core';
import { TextField, Button } from './../materialUI';

const BigInput = props => {

    const classes = useStyles();

    const {
        title='',
        hint='',
        textFieldProps,
        buttonProps,
        placeholder="Type here",
        value,
        onChange,
        callback,
        inputRef,
        buttonRef,
        disabledSubmit,
        buttonChildren,
        ...rest
    } = props;

    return (
        <div className={classes.bigInputWrapper} { ...rest }>
            <span className={classes.bigInputTitle}>{title}</span>
            <div className={classes.bigInputContainer}>
                <TextField
                    className={classes.input}
                    placeholder={placeholder}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{ ref: inputRef }}
                    value={value}
                    onKeyPress={e => { if(e.key === 'Enter') callback(); } }
                    onChange={e => onChange(e.target.value)}
                    { ...textFieldProps }
                />
                <Button 
                    ref={buttonRef}
                    disabled={disabledSubmit} 
                    className={classes.submitButton}
                    color="secondary" 
                    variant="contained"
                    onClick={callback}
                    { ...buttonProps }
                >
                    {buttonChildren}
                </Button>
            </div>
            <span className={classes.bigInputHint}>{hint}</span>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    input: {
        height: 60,
        flex: 1,
        background: theme.palette.background1,
        width: '100%',
        borderRadius: '4px 0 0 4px',
        boxShadow: theme.shadow.insetShadow1,
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 20
        },
        "& .MuiInputBase-input": {
            textAlign: 'center'
        },
    },
    submitButton: {
        minWidth: 60, 
        maxWidth: 60, 
        height: 60, 
        fontSize: 24,
        borderRadius: '0 4px 4px 0'
    },
    bigInputWrapper: {
        width: '100%',
        display: 'flex', 
        flexDirection: 'column'
    },
    bigInputTitle: {
        padding: '7px 0',
        color: theme.palette.primary.main,
        fontSize: 18
    },
    bigInputHint: {
        fontSize: 14,
        padding: '7px 0',
        fontStyle: 'italic',
        color: theme.palette.color5,
    },
    bigInputContainer: {
        width: '100%',
        display: 'flex'
    }
}));

export default BigInput;