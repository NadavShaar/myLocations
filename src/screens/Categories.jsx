import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { deleteCategories } from './../store/actions';

const Categories = props => {
    
    
    const [selectedCategoryIds, setSelectedCategoriesIds] = useState([]);
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    const { categories } = props;
    
    const selectCategory = (isCurrentCategorySelected, categoryId, categoryIndex) => {
        
        let selectedCategoryIdsClone = [ ...selectedCategoryIds ];

        if(isCurrentCategorySelected) selectedCategoryIdsClone.splice(categoryIndex, 1);
        else selectedCategoryIdsClone.push(categoryId);

        setSelectedCategoriesIds(selectedCategoryIdsClone); 
    }

    const removeCategory = () => {
        dispatch(deleteCategories(selectedCategoryIds));

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: `${selectedCategoryIds.length + (selectedCategoryIds.length === 1 ? ' category' : ' categories')} deleted successfully`, 
                type: 'success'
            }
        });

        buttonRef.current.dispatchEvent(event);

        setSelectedCategoriesIds([]); 
    }

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title="Categories"
                buttons={
                    selectedCategoryIds.length ?
                        <React.Fragment>
                            {
                                selectedCategoryIds.length === 1 ?
                                    <React.Fragment>
                                        <LinkButton to={`/myLocations/categories/${selectedCategoryIds}/edit`}>EDIT</LinkButton>
                                        <LinkButton to={`/myLocations/categories/${selectedCategoryIds}/details`}>VIEW DETAILS</LinkButton>
                                    </React.Fragment>
                                    :
                                    null
                            }
                            <Button ref={buttonRef} color="inherit" onClick={removeCategory}>DELETE</Button>
                        </React.Fragment>
                        :
                        <LinkButton to="/myLocations/categories/new">NEW</LinkButton>
                }
            />
            <div className={classes.contentContainer}>
                {
                    categories.length ?
                        <div className={classes.categoriesList}>
                            { 
                                categories.map((category, idx) => {
                                    
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
                        :
                        <span className={classes.noResultsLabel}>No Categories</span>
                }
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
    categoriesList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
        maxHeight: 600,
        overflow: 'auto',
        height: '100%',
        cursor: 'pointer'
    },
    category: {
        background: '#ffff',
        padding: 20,
        display: 'flex',
        height: 60,
        borderBottom: '1px solid #eee',
        "&:hover": {
            backgroundColor: '#eee'
        }
    },
    highlightedCategory: {
        background: 'yellow !important'
    },
    noResultsLabel: {
        fontSize: 48,
        color: '#a9a9a9'
    }
}));

export default Categories;