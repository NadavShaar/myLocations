import React from 'react';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from './../../components/materialUI';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const HistoryGoBackButton = props => {

    const classes = useStyles();

    return <Button className={classes.goBackButton} onClick={e => props.history.goBack()} startIcon={<KeyboardBackspaceIcon className={classes.icon} />}>BACK</Button>
} 

const useStyles = makeStyles((theme) => ({
    goBackButton: {
        color: theme.palette.color1
    },
    icon: {
        fontSize: 18,
        marginBottom: 2
    }
}));

export default withRouter(HistoryGoBackButton);