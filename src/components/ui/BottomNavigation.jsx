import React, { useState, useEffect } from 'react';
import { BottomNavigation as MUIBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LabelIcon from '@material-ui/icons/Label';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

const BottomNavigation = props => {

    let initialSelected = props.location.pathname.startsWith('/categories') ? 1 : 0;

    const [value, setValue] = useState(initialSelected);
    
    const history = useHistory();

    useEffect(() => {
        let currentSelected = props.location.pathname.startsWith('/categories') ? 1 : 0;
        setValue(currentSelected);
    }, [props.location.pathname])
    
    let buttons = [
        { label: 'Locations', icon: <LocationSearchingIcon />},
        { label: 'Categories', icon: <LabelIcon />}
    ];

    return (
        <MUIBottomNavigation
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

export default withRouter(BottomNavigation);