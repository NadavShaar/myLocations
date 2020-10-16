import React, { useState } from 'react';
import { BottomNavigation as MUIBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LabelIcon from '@material-ui/icons/Label';
import { useHistory } from "react-router-dom";

const BottomNavigation = props => {

    const [value, setValue] = useState(0);
    const history = useHistory();
    
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

export default BottomNavigation;