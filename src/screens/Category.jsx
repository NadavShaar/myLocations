import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import TextField from './../components/TextField';
import Button from './../components/Button';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { createNewCategory, updateCategory } from './../store/actions';
import { useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Category = props => {

    
    const classes = useStyles();
    
    const dispatch = useDispatch(); 

    let { id } = useParams();
    
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    
    const { mode, categories } = props;
    
    let categoryIndex = categories.findIndex(category => category.id == id);
    const selectedCategory = categoryIndex > -1 && useSelector(state => state.categories.data[categoryIndex]);

    const [categoryName, setCategoryName] = useState(categoryIndex > -1 ? selectedCategory?.name : "");
    let isCategoryExist = !!categories.find(category => category.name === categoryName);

    const createCategory = () => {
        if(!categoryName) return;

        if(!isCategoryExist) {
            dispatch(createNewCategory({id: Date.now(), name: categoryName})); 
            setCategoryName("");
        }

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isCategoryExist ? `${categoryName} is already exist` : `${categoryName} added successfully`, 
                type: isCategoryExist ? 'error' : 'success', 
            }
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const editCategory = () => {
        if(!categoryName) return;

        let currentCategory = categories[categoryIndex];
        if(!isCategoryExist) dispatch(updateCategory({ ...currentCategory, name: categoryName }));

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isCategoryExist ? `${categoryName} is already exist` : `${categoryName} saved successfully`, 
                type: isCategoryExist ? 'error' : 'success'
            } 
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const getTitleByMode = () => {
        switch (mode) {
            case 'new': return 'New category'
            case 'edit': return `Edit category - ${selectedCategory.name}`
            case 'details': return `Details - ${selectedCategory.name}`
            default: return null;
        }
    }

    const renderBigInput = ({callback, children, disabled, title, hint}) => (
        <div className={classes.bigInputWrapper}>
            <span className={classes.bigInputTitle}>{title}</span>
            <div className={classes.bigInputContainer}>
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
                    ref={buttonRef}
                    disabled={disabled} 
                    className={classes.submitButton}
                    color="secondary" 
                    variant="contained"
                    onClick={callback}
                >
                    {children}
                </Button>
            </div>
            <span className={classes.bigInputHint}>{hint}</span>
        </div>
    )

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return renderBigInput({callback: createCategory, children: '+', disabled: !categoryName, title: 'Add new category', hint: 'Hint: you can also submit using the Enter key.'})
            case 'edit': return renderBigInput({callback: editCategory, children: <React.Fragment>&#10003;</React.Fragment>, disabled: !categoryName, title: 'Update new category', hint: 'Hint: you can also submit using the Enter key.'})
            case 'details': return <div className={classes.paper}><span className={classes.detailType}>Category name:</span><span className={classes.categoryName}>{categoryName}</span></div>;
            default: return null;
        }
    }

    const renderToolbar = () => (
        <Toolbar 
            title={getTitleByMode()}
            buttons={ <LinkButton to="/myLocations/categories/" startIcon={<KeyboardBackspaceIcon className={classes.icon} />}>BACK</LinkButton> }
        />
    )

    return (
        <div className={classes.pageContainer}>
            { renderToolbar() }
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
        height: 60,
        background: theme.palette.background1,
        maxWidth: 400,
        width: '100%',
        borderRadius: '4px 0 0 4px',
        boxShadow: theme.shadow.insetShadow1,
        "& .MuiInputBase-root": {
            height: '100%',
            fontSize: 24
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
    categoryName: {
        fontSize: 40,
        color: theme.palette.color6,
        padding: '10px 20px',
        textAlign: 'center'
    },
    paper: {
        display: 'inline-flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[1],
        background: theme.palette.background1,
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: 200
    },
    detailType: {
        fontSize: 14,
        padding: '7px 10px',
        fontStyle: 'italic',
        color: theme.palette.color1,
        fontWeight: 500,
        background: theme.palette.primary.main,
        backgroundImage: theme.palette.gradient1,
        borderBottom: `1px solid ${theme.palette.border1}` 
    },
    icon: {
        fontSize: 18,
        marginBottom: 2
    },
    bigInputWrapper: {
        display: 'flex', 
        flexDirection: 'column'
    },
    bigInputTitle: {
        padding: '7px 0',
        color: theme.palette.color4,
        fontSize: 18
    },
    bigInputHint: {
        fontSize: 14,
        padding: '7px 0',
        fontStyle: 'italic',
        color: theme.palette.color5,
    },
    bigInputContainer: {
        display: 'flex'
    }
}));

export default Category;