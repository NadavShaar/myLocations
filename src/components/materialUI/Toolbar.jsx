import React from 'react';
import { makeStyles, AppBar, Typography } from '@material-ui/core';
import AppToolbar from '@material-ui/core/Toolbar';

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
        minHeight: 60,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        backgroundImage: theme.palette.gradient1,
        "& .MuiToolbar-root": {
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                flexDirection: props => props.isSingleRow ? 'row' : 'column'
            }
        },
    },
    titleWrapper: {
        display: 'flex',
        flexGrow: 1,
        marginRight: 10,
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            justifyContent: 'space-between',
            marginRight: 0
        }
    },
    title: {
        display: props => props.isSingleRow ? 'inline-block' : 'flex',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
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