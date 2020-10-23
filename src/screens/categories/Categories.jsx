import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Button, Toolbar, LinkButton } from './../../components/materialUI';
import { deleteCategories } from './../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import LabelIcon from '@material-ui/icons/Label';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { Search, CollapsableList } from './../../components/ui';

const Categories = props => {
    
    
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    const categories = useSelector(state => state.categories) || {};
    const locations = useSelector(state => state.locations.data) || [];

    let filteredCategories = {}
    for (var key in categories) { if(categories[key]?.name?.toLowerCase?.().includes(searchText.toLowerCase())) filteredCategories[key] = categories[key];}
    
    let selectedCategory = selectedCategoriesIds.length === 1 && filteredCategories[selectedCategoriesIds[0]];

    let categoriesLength = (Object.keys(categories).length);
    let filteredCategoriesLength = (Object.keys(filteredCategories).length);


    
    const selectCategory = (isCurrentCategorySelected, categoryId, categoryIndex) => {
        
        let selectedCategoryIdsClone = [ ...selectedCategoriesIds ];

        if(isCurrentCategorySelected) selectedCategoryIdsClone.splice(categoryIndex, 1);
        else selectedCategoryIdsClone.push(categoryId);

        setSelectedCategoriesIds(selectedCategoryIdsClone); 
    }

    const removeCategory = () => {

        let isSingleCategory = selectedCategoriesIds.length === 1;
        let hasAssignedCategory = locations.some(location => location.categoriesIds.some(catId => selectedCategoriesIds.indexOf(catId) !== -1))

        if(hasAssignedCategory) {
            const event = new CustomEvent('displayConfirm', {
                bubbles: true,
                detail: {
                    cancelLabel: 'OK',
                    description: isSingleCategory ?
                            'The selected category is assigned to location and cannot be deleted'
                            : 
                            'Some categories are assigned to locations and cannot be deleted',
                }
            });
            
            return buttonRef.current.dispatchEvent(event);
        }

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
                            message: `${isSingleCategory ? selectedCategory.name : (selectedCategoriesIds.length + ' categories')} deleted successfully`, 
                            type: 'success',
                        }
                    });

                    dispatch(deleteCategories(selectedCategoriesIds));
            
                    setSelectedCategoriesIds([]); 

                    buttonRef.current.dispatchEvent(event);
            
                }
            }
        });

        buttonRef.current.dispatchEvent(event);

    }

    const renderToolbar = () => (
        <Toolbar 
            title={`Categories${categoriesLength ? (' (' + categoriesLength + ')') : ''}`}
            isSingleRow={!selectedCategoriesIds.length}
            isSingleButton={selectedCategoriesIds.length > 1}
            leftChildren={ selectedCategoriesIds.length ? <span className={classes.clearSelectionButton}><CloseIcon className={classes.icon} onClick={e => setSelectedCategoriesIds([])} />{`${selectedCategoriesIds.length} selected`}</span> : null }
            buttons={ selectedCategoriesIds.length ?
                <React.Fragment>
                    {
                        selectedCategoriesIds.length === 1 ?
                            <React.Fragment>
                                <LinkButton className={classes.button} to={`/categories/${selectedCategoriesIds}/edit`} startIcon={<EditIcon className={classes.icon} />}>EDIT</LinkButton>
                                <LinkButton className={classes.button} to={`/categories/${selectedCategoriesIds}/details`} startIcon={<VisibilityIcon className={classes.icon} />}>VIEW DETAILS</LinkButton>
                            </React.Fragment>
                            :
                            null
                    }
                    <Button ref={buttonRef} className={classes.button} color="inherit" onClick={removeCategory} startIcon={<DeleteIcon className={classes.icon} />}>DELETE</Button>
                </React.Fragment>
                :
                <LinkButton className={classes.button} to="/categories/new" startIcon={<AddIcon className={classes.icon} />}>NEW</LinkButton>
            }
        />
    )

    const renderSearch = () => (
        <Search 
            autoFocus={true}
            label="Search category"
            searchText={searchText}
            onSearchChange={setSearchText}
        />
    )

    const renderCategoriesList = () => (
        <CollapsableList 
            listConfig={
                Object.keys(filteredCategories).map(key => {
                    let currentCategory = filteredCategories[key];
                    let assinedLocations = locations.filter(location => location.categoriesIds.indexOf(key) !== -1).map(loc => loc.name).join(', ');
                    
                    return {
                        id: key,
                        text: currentCategory.name,
                        secondaryText: assinedLocations,
                        icon: <LabelIcon />,
                        selected: !!selectedCategoriesIds.find(catId => catId === key)
                    }
                })
            }
            selectedItemsIds={selectedCategoriesIds}
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
                            filteredCategoriesLength ?
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
        padding: 20,
        position: 'relative',
        overflow: 'auto',
        [theme.breakpoints.down('xs')]: {
            alignItems: 'unset'
        }
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
        color: theme.palette.color1,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 0px',
            marginLeft: 0
        }
    },
    icon: {
        fontSize: 20
    },
    clearSelectionButton: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 20,
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        "& > svg": {
            cursor: 'pointer'
        }
    }
}));

export default Categories;