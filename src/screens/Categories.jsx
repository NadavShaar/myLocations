import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from './../components/Toolbar';
import LinkButton from '../components/LinkButton';

const Categories = props => {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = useSelector(state => state.categories);
    const classes = useStyles();

    return (
        <div className={classes.pageContainer}>
            <Toolbar 
                title="Categories"
                buttons={
                    selectedCategory ?
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
                <div className={classes.categoriesList}>
                    { categories.map((category, idx) => <span key={idx} className={classes.category}>{category.name}</span>) }
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
        height: '100%',
        padding: 20
    },
    categoriesList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
        maxHeight: 600,
        overflow: 'auto',
        cursor: 'pointer'
    },
    category: {
        background: '#ffff',
        padding: 20,
        display: 'flex',
        height: 60,
        boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 0.3)'
    }
}));

export default Categories;