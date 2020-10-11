import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LinkButton = (props) => {

    const classes = useStyles();

    const {
        history,
        location,
        match,
        staticContext,
        to,
        onClick,
        children,
        ...rest
    } = props

    return (
        <Button
            className={classes.button}
            {...rest}
            onClick={e => {
                onClick && onClick(e);
                history.push(to);
            }}
        >
            { children }
        </Button>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.primary.contrastText
    }
}));

export default withRouter(LinkButton);