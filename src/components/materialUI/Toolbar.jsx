import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Toolbar = props => {

    const classes = useStyles();

    const {
        title='',
        buttons
    } = props;

    return (
        <AppBar position="static" className={classes.toolbar}>
            <AppToolbar>
                <Typography variant="h6" className={classes.title}>{title}</Typography>
                { buttons }
            </AppToolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        overflow: 'auto',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: theme.palette.gradient1,
        "& .MuiToolbar-root": {
            minWidth: 'max-content'
        }
    },
    title: {
        flexGrow: 1 
    },
}));

export default Toolbar;