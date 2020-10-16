import React from "react";
import Categories from './../../screens/categories/Categories';
import Category from './../../screens/categories/Category';

export default [
    {
        path: '/categories',
        exact: true,
        component: Categories
    },
    {
        path: '/categories/new',
        exact: true,
        component: props => <Category mode="new" { ...props } />
    },
    {
        path: '/categories/:id/edit',
        exact: false,
        component: props => <Category mode="edit" { ...props } />
    },
    {
        path: '/categories/:id/details',
        exact: false,
        component: props => <Category mode="details" { ...props } />
    }
];