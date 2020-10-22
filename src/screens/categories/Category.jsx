import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar, Chip } from './../../components/materialUI';
import { BigInput, HistoryGoBackButton, PageNotFoundMessage } from './../../components/ui';
import { createNewCategory, updateCategory } from './../../store/actions';
import { useParams } from "react-router-dom";

const Category = props => {
    
    const classes = useStyles();
    
    const dispatch = useDispatch(); 

    let { id } = useParams();
    
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    
    const categories = useSelector(state => state.categories) || {};
    const locations = useSelector(state => state.locations.data) || [];
    
    const selectedCategory = useSelector(state => state.categories[id]);
    
    const [categoryName, setCategoryName] = useState(selectedCategory?.name || "");
    let trimmedCategoryName = categoryName.trim();
    let isCategoryExist = !!(Object.values(categories)).find(category => category.name === trimmedCategoryName);
    
    const { mode } = props;

    let dataIsMissing = mode !== 'new' && !id || mode !== 'new' && !selectedCategory;
    let assignedLocations = id && locations.filter(location => location.categoriesIds.indexOf(id) !== -1) || [];
    
    const createCategory = () => {
        if(!trimmedCategoryName) return;

        if(!isCategoryExist) {
            dispatch(createNewCategory({name: trimmedCategoryName})); 
            setCategoryName("");
        }

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isCategoryExist ? `${trimmedCategoryName} is already exist` : `${trimmedCategoryName} added successfully`, 
                type: isCategoryExist ? 'error' : 'success', 
            }
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef?.current?.focus?.() }, 0);
    }

    const editCategory = () => {
        if(!trimmedCategoryName) return;

        if(!isCategoryExist) dispatch(updateCategory({id, item: { ...selectedCategory, name: trimmedCategoryName }}));

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isCategoryExist ? `${trimmedCategoryName} is already exist` : `${trimmedCategoryName} saved successfully`, 
                type: isCategoryExist ? 'error' : 'success'
            } 
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef?.current?.focus?.() }, 0);
    }

    const getTitleByMode = () => {
        switch (mode) {
            case 'new': return 'New category'
            case 'edit': return dataIsMissing ? 'Edit category' : `Edit category - ${selectedCategory.name}`
            case 'details': return dataIsMissing ? 'Details' : `Details - ${selectedCategory.name}`
            default: return null;
        }
    }

    const renderBigInput = ({callback, buttonChildren, disabled, title, hint}) => (
        <BigInput 
            title={title}
            hint={hint}
            inputRef={inputRef}
            buttonRef={buttonRef}
            value={categoryName}
            callback={callback}
            buttonChildren={buttonChildren}
            onChange={setCategoryName}
            disabledSubmit={disabled}
            textFieldProps={{autoFocus: true}}
        />
    )

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return renderBigInput({callback: createCategory, buttonChildren: '+', disabled: !categoryName, title: 'Add new category', hint: 'Hint: you can also submit using the Enter key.'})
            case 'edit': return renderBigInput({callback: editCategory, buttonChildren: <React.Fragment>&#10003;</React.Fragment>, disabled: !categoryName, title: 'Update category', hint: 'Hint: you can also submit using the Enter key.'})
            case 'details': return (
                <div className={classes.paper}>
                    <span className={classes.detailType}>Category name:</span>
                    <span className={classes.categoryName}>{trimmedCategoryName}</span>
                    <span className={classes.detailType}>Assigned to:</span>
                    {
                        assignedLocations.length ?
                            <div className={classes.chipsWrapper}>
                                { assignedLocations.map((loc, idx) => <Chip key={idx} label={loc.name} />) }
                            </div>
                            :
                            <span className={classes.categoryName} style={{margin: 0, fontStyle: 'italic'}}>Not assigned yet</span>
                    }
                </div>
            );
            default: return null;
        }
    }

    const renderToolbar = () => (
        <Toolbar 
            title={getTitleByMode()}
            isSingleRow={true}
            buttons={ <HistoryGoBackButton /> }
        />
    )

    return (
        <div className={classes.pageContainer}>
            { renderToolbar() }
            <div className={classes.contentContainer}>
                <div className={classes.inputWrapper}>
                    { 
                        dataIsMissing ?
                            <PageNotFoundMessage />
                            :
                            renderContentByMode() 
                    }
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        overflow: 'auto'
    },
    inputWrapper: {
        display: 'inline-flex',
        maxWidth: '100%'
    },
    paper: {
        display: 'inline-flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[1],
        background: theme.palette.background1,
        borderRadius: 4,
        padding: 20,
        minWidth: 300,
        maxWidth: 500
    },
    categoryName: {
        fontSize: 14,
        color: theme.palette.color3,
        marginBottom: 15,
        wordBreak: 'break-word'
    },
    detailType: {
        fontSize: 16,
        marginBottom: 2,
        fontWeight: 500,
    },
    icon: {
        fontSize: 18,
        marginBottom: 2
    },
    chipsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: 98,
        minHeight: 36,
        overflow: 'auto'
    }
}));

export default Category;