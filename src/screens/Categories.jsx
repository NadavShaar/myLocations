import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Button, Toolbar, LinkButton } from './../components/materialUI';
import { deleteCategories } from './../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Search, List } from './../components/ui';

const Categories = props => {
    
    
    const [selectedCategoryIds, setSelectedCategoriesIds] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    const { categories } = props;
    let filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchText.toLowerCase()))

    let selectedCategory = selectedCategoryIds.length === 1 && filteredCategories.find(cat => cat.id === selectedCategoryIds[0]);


    
    const selectCategory = (isCurrentCategorySelected, categoryId, categoryIndex) => {
        
        let selectedCategoryIdsClone = [ ...selectedCategoryIds ];

        if(isCurrentCategorySelected) selectedCategoryIdsClone.splice(categoryIndex, 1);
        else selectedCategoryIdsClone.push(categoryId);

        setSelectedCategoriesIds(selectedCategoryIdsClone); 
    }

    const removeCategory = () => {

        let isSingleCategory = selectedCategoryIds.length === 1;

        const event = new CustomEvent('displayConfirm', {
            bubbles: true,
            detail: {
                description: `Are you sure you want to delete ${isSingleCategory ? selectedCategory.name : 'the selected categories'}?`,
                submitLabel: 'Delete',
                onSubmit: () => {
                    const event = new CustomEvent('displaySnackbar', {
                        bubbles: true,
                        detail: {
                            open: true, 
                            message: `${isSingleCategory ? selectedCategory.name : (selectedCategoryIds.length + ' categories')} deleted successfully`, 
                            type: 'success',
                        }
                    });

                    dispatch(deleteCategories(selectedCategoryIds));
            
                    setSelectedCategoriesIds([]); 

                    buttonRef.current.dispatchEvent(event);
            
                }
            }
        });

        buttonRef.current.dispatchEvent(event);

    }

    const renderToolbar = () => (
        <Toolbar 
            title={`Categories${categories.length ? (' (' + categories.length + ')') : ''}`}
            buttons={
                selectedCategoryIds.length ?
                    <React.Fragment>
                        <span className={classes.clearSelectionButton}><CloseIcon className={classes.icon} onClick={e => setSelectedCategoriesIds([])} />{`${selectedCategoryIds.length} selected`}</span>
                        {
                            selectedCategoryIds.length === 1 ?
                                <React.Fragment>
                                    <LinkButton className={classes.button} to={`/${selectedCategoryIds}/edit`} startIcon={<EditIcon className={classes.icon} />}>EDIT</LinkButton>
                                    <LinkButton className={classes.button} to={`/${selectedCategoryIds}/details`} startIcon={<VisibilityIcon className={classes.icon} />}>VIEW DETAILS</LinkButton>
                                </React.Fragment>
                                :
                                null
                        }
                        <Button ref={buttonRef} className={classes.button} color="inherit" onClick={removeCategory} startIcon={<DeleteIcon className={classes.icon} />}>DELETE</Button>
                    </React.Fragment>
                    :
                    <LinkButton className={classes.button} to="/new" startIcon={<AddIcon className={classes.icon} />}>NEW</LinkButton>
            }
        />
    )

    const renderSearch = () => (
        <Search 
            autoFocus={true}
            label="Search category"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
        />
    )

    const renderCategoriesList = () => (
        <List 
            items={filteredCategories}
            selectedItemsIds={selectedCategoryIds}
            onSelectionChange={selectCategory}
        />
    )

    const renderNoResults = () => (
        <span className={classes.noResultsLabel}>No Categories</span>
    )

    return (
        <div className={classes.pageContainer}>
            { renderToolbar() }
            <div className={classes.contentContainer}>
                <div className={classes.categoriesListContainer}>
                    { renderSearch() }
                    <div className={classes.categoriesContainer}>
                        {
                            filteredCategories.length ?
                                renderCategoriesList()
                                :
                                renderNoResults()
                        }
                    </div>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        height: 'calc(100% - 64px)',
        padding: 20,
        position: 'relative'
    },
    categoriesListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
        maxHeight: 600,
        height: '100%'
    },
    categoriesContainer: {
        width: '100%',
        height: 'calc(100% - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background1,
        boxShadow: theme.shadows[1],
        borderRadius: 4,
        overflow: 'hidden'
    },
    noResultsLabel: {
        fontSize: 36,
        color: theme.palette.color6,
        fontStyle: 'italic'
    },
    button: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        marginLeft: 10,
        color: theme.palette.color1
    },
    icon: {
        fontSize: 20
    },
    clearSelectionButton: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 8,
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        "& > svg": {
            cursor: 'pointer'
        }
    }
}));

export default Categories;