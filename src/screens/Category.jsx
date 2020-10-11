import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { createNewCategory, setSnackbarProps, updateCategory } from './../store/actions';

const Category = props => {

    
    const classes = useStyles();
    const dispatch = useDispatch(); 
    
    const inputRef = useRef(null);
    
    const categories = useSelector(state => state.categories);

    let categoryIndex = categories.data.findIndex(category => category.id === categories.selectedCategoryId);

    const [categoryName, setCategoryName] = useState(categoryIndex > -1 ? categories.data[categoryIndex]?.name : "");
    let isCategoryExist = !!categories.data.find(category => category.name === categoryName);

    const {
        mode,
        title
    } = props;

    const createCategory = () => {

        if(!isCategoryExist) {
            dispatch(createNewCategory({id: categories.data.length + 1, name: categoryName})); 
            setCategoryName("");
        }

        dispatch(setSnackbarProps({
            open: true, 
            message: isCategoryExist ? `'${categoryName}' is already exist` : `'${categoryName}' added successfully`, 
            type: isCategoryExist ? 'error' : 'success', 
        }));

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const editCategory = () => {
        let currentCategory = categories.data[categoryIndex];
        dispatch(updateCategory({ ...currentCategory, name: categoryName }));

        dispatch(setSnackbarProps({
            open: true, 
            message: currentCategory ? 'Category updated successfully' : 'Failed to update category', 
            type: currentCategory ? 'success' : 'error', 
        }));
    }

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return (
                <React.Fragment>
                    <TextField 
                        autoFocus={true}
                        className={classes.input}
                        placeholder="Type here"
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ ref: inputRef }}
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <Button 
                        disabled={!categoryName} 
                        className={classes.submitButton}
                        color="secondary" 
                        variant="contained"
                        onClick={createCategory}
                    >
                        +
                    </Button>
                </React.Fragment>
            )
            case 'edit': {
                return (
                    <React.Fragment>
                        <TextField 
                            autoFocus={true}
                            className={classes.input}
                            placeholder="Type here"
                            InputProps={{ disableUnderline: true }}
                            inputProps={{ ref: inputRef }}
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                        <Button 
                            disabled={!categoryName || (categories.data[categoryIndex]?.name === categoryName)} 
                            className={classes.submitButton}
                            color="secondary" 
                            variant="contained"
                            onClick={editCategory}
                        >
                            EDIT
                        </Button>
                    </React.Fragment>
                )
            }
            default: return null;
        }
    }

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title={title}
                buttons={ <LinkButton to="/">BACK</LinkButton> }
            />
            <div className={classes.contentContainer}>
                <div className={classes.inputWrapper}>
                    { renderContentByMode() }
                </div>
            </div>
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
        height: 80,
        background: '#fff',
        maxWidth: 400,
        width: '100%',
        borderRadius: '4px 0 0 4px',
        boxShadow: 'inset 1px 1px 2px 1px rgb(0 0 0 / 0.3)',
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 30
        },
        "& .MuiInputBase-input": {
            textAlign: 'center'
        },
    },
    submitButton: {
        minWidth: 80, 
        maxWidth: 80, 
        height: 80, 
        fontSize: 30,
        borderRadius: '0 4px 4px 0'
    }
}));

export default Category;