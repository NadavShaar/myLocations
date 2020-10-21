import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Toolbar = props => {

    
    const {
        title='',
        buttons,
        leftChildren,
        isSingleRow,
        isSingleButton,
    } = props;

    const classes = useStyles(props);

    return (
        <AppBar position="static" className={classes.toolbar}>
            <AppToolbar className={classes.appToolbar}>
                <div className={classes.titleWrapper}>
                    <Typography variant="h6" className={classes.title}>{title}</Typography>
                    { leftChildren }
                </div>
                <div className={classes.buttonsWrapper}>
                    { buttons }
                </div>
            </AppToolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    appToolbar: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    toolbar: {
        overflow: 'auto',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: theme.palette.gradient1,
        "& .MuiToolbar-root": {
            minWidth: 'max-content',
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                flexDirection: props => props.isSingleRow ? 'row' : 'column'
            }
        },
    },
    titleWrapper: {
        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            justifyContent: 'space-between'
        }
    },
    title: {
        display: 'flex' 
    },
    buttonsWrapper: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            width: props => props.isSingleRow ? 'unset' : '100%',
            justifyContent: props => props.isSingleButton ? 'flex-end' : 'space-between'
        }
    },
}));

export default Toolbar;