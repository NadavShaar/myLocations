import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Button, TextField, InputAdornment } from '@material-ui/core';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { deleteCategories } from './../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const Categories = props => {
    
    
    const [selectedCategoryIds, setSelectedCategoriesIds] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    const { categories } = props;
    let filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchText.toLowerCase()))

    let selectedCategory = selectedCategoryIds.length === 1 ? filteredCategories.find(cat => cat.id === selectedCategoryIds[0]) : null;


    
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
                                    <LinkButton className={classes.button} to={`/myLocations/categories/${selectedCategoryIds}/edit`} startIcon={<EditIcon className={classes.icon} />}>EDIT</LinkButton>
                                    <LinkButton className={classes.button} to={`/myLocations/categories/${selectedCategoryIds}/details`} startIcon={<VisibilityIcon className={classes.icon} />}>VIEW DETAILS</LinkButton>
                                </React.Fragment>
                                :
                                null
                        }
                        <Button ref={buttonRef} className={classes.button} color="inherit" onClick={removeCategory} startIcon={<DeleteIcon className={classes.icon} />}>DELETE</Button>
                    </React.Fragment>
                    :
                    <LinkButton className={classes.button} to="/myLocations/categories/new" startIcon={<AddIcon className={classes.icon} />}>NEW</LinkButton>
            }
        />
    )

    const renderSearch = () => (
        <TextField 
            autoFocus={true}
            label="Search category"
            className={classes.search}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
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
        />
    )

    const renderCategoriesList = () => (
        <div className={classes.categoriesList}>
            { 
                filteredCategories.map((category, idx) => {
                    
                    const currentCategoryIndex = selectedCategoryIds.findIndex(selectedCategoryId => selectedCategoryId === category.id);
                    const isCurrentCategorySelected = currentCategoryIndex > -1;

                    return (
                        <span 
                            key={idx} 
                            className={`${classes.category} ${isCurrentCategorySelected ? classes.highlightedCategory : ''}`.trim()} 
                            onClick={e => selectCategory(isCurrentCategorySelected, category.id, currentCategoryIndex)}
                        >
                            {category.name}
                        </span>
                    )
                })
            }
        </div>
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
    categoriesList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'auto',
        height: '100%',
    },
    category: {
        cursor: 'pointer',
        background: '#ffff',
        padding: 20,
        display: 'flex',
        height: 60,
        borderBottom: '1px solid #eee',
        transition: 'background .1s ease-in-out',
        "&:hover": {
            backgroundColor: '#eee'
        }
    },
    highlightedCategory: {
        background: `${theme.palette.secondary.main} !important`
    },
    categoriesContainer: {
        width: '100%',
        height: 'calc(100% - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        boxShadow: '1px 1px 1px 0px rgb(0 0 0 / .3)',
        borderRadius: 4,
        overflow: 'hidden'
    },
    noResultsLabel: {
        fontSize: 36,
        color: '#78909C',
        fontStyle: 'italic'
    },
    button: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        marginLeft: 10,
        color: '#fff'
    },
    icon: {
        fontSize: 18,
        // marginBottom: 2
    },
    clearSelectionButton: {
        display: 'inline-flex',
        marginLeft: 30,
        marginRight: 8,
        "& > svg": {
            cursor: 'pointer'
        }
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

export default Categories;