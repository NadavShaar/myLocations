import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HistoryGoBackButton } from './';

const PageNotFoundMessage = props => {

    const classes = useStyles();

    return (
        <div className={classes.container}> 
            <span className={classes.topText}>404</span>
            <span className={classes.bottomText}>Not found</span>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        color: theme.palette.color5
    },
    topText: {
        fontSize: 90, 
        borderBottom: `5px solid ${theme.palette.color7}`, 
        marginBottom: 20
    },
    bottomText: {
        fontSize: 28, 
        fontWeight: 500, 
        fontStyle: 'italic'
    }
}));

export default PageNotFoundMessage;