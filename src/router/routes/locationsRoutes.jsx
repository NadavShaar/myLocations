import React from "react";
import Locations from './../../screens/locations/Locations';
import Location from './../../screens/locations/Location';

export default [
    {
        path: '/',
        exact: true,
        component: Locations
    },
    {
        path: '/new',
        exact: true,
        component: props => <Location mode="new" { ...props } />
    },
    {
        path: '/:id/edit',
        exact: false,
        component: props => <Location mode="edit" { ...props } />
    },
    {
        path: '/:id/details',
        exact: false,
        component: props => <Location mode="details" { ...props } />
    }
];