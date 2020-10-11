import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';
import { setCategory } from './../store/actions';

const Categories = props => {
    
    let categoriesData = useSelector(state => state.categories.data);
    let selectedCategoryId = useSelector(state => state.categories.selectedCategoryId);

    const dispatch = useDispatch();
    const classes = useStyles();

    const selectCategory = (isCurrentCategorySelected, categoryId) => {
        let categoryToSet = isCurrentCategorySelected ? null : categoryId;
        dispatch(setCategory(categoryToSet)); 
    }

    useEffect(() => {
        dispatch(setCategory(null));
    }, [])

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title="Categories"
                buttons={
                    selectedCategoryId ?
                        <React.Fragment>
                            <LinkButton to="/edit">EDIT</LinkButton>
                            <LinkButton to="/view-details">VIEW DETAILS</LinkButton>
                            <Button color="inherit">DELETE</Button>
                        </React.Fragment>
                        :
                        <LinkButton to="/new">NEW</LinkButton>
                }
            />
            <div className={classes.contentContainer}>
                {
                    categoriesData.length ?
                        <div className={classes.categoriesList}>
                            { 
                                categoriesData.map((category, idx) => {

                                    const isCurrentCategorySelected = selectedCategoryId === category.id;

                                    return (
                                        <span 
                                            key={idx} 
                                            className={`${classes.category} ${isCurrentCategorySelected ? classes.highlightedCategory : ''}`.trim()} 
                                            onClick={e => selectCategory(isCurrentCategorySelected, category.id)}
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