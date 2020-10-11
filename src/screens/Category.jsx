import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import Snackbar from '../components/Snackbar';
import { createNewCategory } from './../store/actions';

const Category = props => {

    const [categoryName, setCategoryName] = useState("");
    const [snackbarProps, setSnackbarProps] = useState({open: false});

    const classes = useStyles();
    const dispatch = useDispatch(); 

    const categories = useSelector(state => state.categories);
    let isCategoryExist = !!categories.find(category => category.name === categoryName);

    const submitNewCategory = () => {

        if(!isCategoryExist) {
            dispatch(createNewCategory({name: categoryName})); 
            setCategoryName("");
        }

        setSnackbarProps({
            open: true, 
            message: isCategoryExist ? `'${categoryName}' is already exist` : `'${categoryName}' added successfully`, 
            type: isCategoryExist ? 'error' : 'success', 
            onClose: () => setSnackbarProps({open: false})
        });

    }

    const renderContentByMode = () => {
        switch (props.mode) {
            case 'new': return (
                <React.Fragment>
                    <TextField 
                            className={classes.input}
                            placeholder="Type here"
                            InputProps={{ disableUnderline: true }}
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                        <Button 
                            disabled={!categoryName} 
                            className={classes.submitButton}
                            color="secondary" 
                            variant="contained"
                            onClick={submitNewCategory}
                        >
                            +
                    </Button>
                </React.Fragment>
            )
            default: return null;
        }
    }

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title="Add new category"
                buttons={ <LinkButton to="/">BACK</LinkButton> }
            />
            <div className={classes.contentContainer}>
                <div className={classes.inputWrapper}>
                    { renderContentByMode() }
                </div>
            </div>
            <Snackbar { ...snackbarProps } />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%'
    },
    contentContainer: {
        flex: 1, 
        height: 'calc(100% - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    inputWrapper: {
        display: 'inline-flex'
    },
    input: {
        height: 120,
        background: '#fff',
        maxWidth: 400,
        width: '100%',
        borderRadius: '4px 0 0 4px',
        boxShadow: 'inset 1px 1px 2px 1px rgb(0 0 0 / 0.3)',
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 40
        },
        "& .MuiInputBase-input": {
            textAlign: 'center'
        },
    },
    submitButton: {
        width: 120, 
        fontSize: 48,
        borderRadius: '0 4px 4px 0'
    }
}));

export default Category;