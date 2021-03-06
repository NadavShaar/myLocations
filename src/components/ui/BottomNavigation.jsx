import React, { useState, useEffect } from 'react';
import { makeStyles, BottomNavigation as MUIBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import LabelIcon from '@material-ui/icons/Label';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

const BottomNavigation = props => {

    let initialSelected = props.location.pathname.startsWith('/categories') ? 1 : 0;

    const [value, setValue] = useState(initialSelected);
    
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        let currentSelected = props.location.pathname.startsWith('/categories') ? 1 : 0;
        setValue(currentSelected);
    }, [props.location.pathname])
    
    let buttons = [
        { label: 'Locations', icon: <MapIcon />},
        { label: 'Categories', icon: <LabelIcon />}
    ];

    return (
        <MUIBottomNavigation
            className={classes.root}
            value={value}
            onChange={(e, val) => {
                setValue(val);
                switch (val) {
                    case 0: return history.push('/locations');
                    case 1: return history.push('/categories');
                    default: return history.push('/locations');
                }
            }}
            showLabels
        >
            {
                buttons.map((button, idx) => (
                    <BottomNavigationAction  
                        key={idx}
                        label={button.label}
                        icon={button.icon}
                    />
                ))
            }
        </MUIBottomNavigation>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 9,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: `1px solid ${theme.palette.border1}`
    }
}));

export default withRouter(BottomNavigation);