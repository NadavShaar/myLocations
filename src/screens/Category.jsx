import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { createNewCategory, setSnackbarProps, updateCategory } from './../store/actions';
import { useParams } from "react-router-dom";

const Category = props => {

    
    const classes = useStyles();
    const dispatch = useDispatch(); 
    let { id } = useParams();
    
    const inputRef = useRef(null);
    
    const { categories } = props;
    
    let categoryIndex = categories.findIndex(category => category.id == id);
    const selectedCategory = useSelector(state => state.categories.data[categoryIndex]);

    const [categoryName, setCategoryName] = useState(categoryIndex > -1 ? selectedCategory?.name : "");
    let isCategoryExist = !!categories.find(category => category.name === categoryName);

    const {
        mode
    } = props;

    const createCategory = () => {

        if(!isCategoryExist) {
            dispatch(createNewCategory({id: categories.length + 1, name: categoryName})); 
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
        
        let currentCategory = categories[categoryIndex];
        if(!isCategoryExist) dispatch(updateCategory({ ...currentCategory, name: categoryName }));
        
        dispatch(setSnackbarProps({
            open: true, 
            message: isCategoryExist ? `'${categoryName}' is already exist` : `'${categoryName}' updated successfully`, 
            type: isCategoryExist ? 'error' : 'success', 
        }));

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const getTitleByMode = () => {
        switch (mode) {
            case 'new': return 'New category'
            case 'edit': return 'Edit category'
            case 'details': return 'Details'
            default: return null;
        }
    }

    const renderBigInput = ({callback, children, disabled}) => (
        <React.Fragment>
            <TextField 
                autoFocus={true}
                className={classes.input}
                placeholder="Type here"
                InputProps={{ disableUnderline: true }}
                inputProps={{ ref: inputRef }}
                value={categoryName}
                onKeyPress={e => { if(e.key === 'Enter') callback(); } }
                onChange={e => setCategoryName(e.target.value)}
            />
            <Button 
                disabled={disabled} 
                className={classes.submitButton}
                color="secondary" 
                variant="contained"
                onClick={callback}
            >
                {children}
            </Button>
        </React.Fragment>
    )

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return renderBigInput({callback: createCategory, children: '+', disabled: !categoryName})
            case 'edit': return renderBigInput({callback: editCategory, children: <React.Fragment>&#10003;</React.Fragment>, disabled: !categoryName})
            case 'details': return <span className={classes.categoryName}>{categoryName}</span>;
            default: return null;
        }
    }

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title={getTitleByMode()}
                buttons={ <LinkButton to="/categories/">BACK</LinkButton> }
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
    },
    categoryName: {
        fontSize: 48
    }
}));

export default Category;