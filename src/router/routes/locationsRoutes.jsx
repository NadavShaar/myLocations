import React from "react";
import Locations from './../../screens/locations/Locations';
import Location from './../../screens/locations/Location';

export default [
    {
        path: '/locations',
        exact: true,
        component: Locations
    },
    {
        path: '/locations/new',
        exact: true,
        component: props => <Location mode="new" { ...props } />
    },
    {
        path: '/locations/:id/edit',
        exact: false,
        component: props => <Location mode="edit" { ...props } />
    },
    {
        path: '/locations/:id/details',
        exact: false,
        component: props => <Location mode="details" { ...props } />
    }
];