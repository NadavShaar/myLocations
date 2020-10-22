import React from 'react';
import { makeStyles, Avatar as MUIAvatar } from '@material-ui/core';

const Avatar = props => {

    const classes = useStyles(props);

    let rootClass = `${classes.root} ${props.className || ''}`.trim();

    return <MUIAvatar { ...props } className={rootClass} />
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background3
    }
}));

export default Avatar;