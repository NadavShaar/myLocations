import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CollapsableListItem = props => {

    const [open, setOpen] = useState(false);

    const { 
        currentItemIndex,
        isCurrentItemSelected,
        listItem,
        onSelectionChange,
        classes,
        selectedItemsIds,
        idx
    } = props;

    let selectionClick = onSelectionChange && !listItem.nestedItems ? { onClick: e =>  onSelectionChange(isCurrentItemSelected, listItem.id, currentItemIndex)} : listItem.nestedItems ? { onClick: e => setOpen(!open)} : {};


    const renderListItem = (listItem, idx, additionalProps) => {

        let isClickable = !!listItem.onClick || !!onSelectionChange;

        return (
            <ListItem key={idx} { ...additionalProps } button={isClickable}>
                {
                    listItem.icon ? 
                        <ListItemIcon>{ listItem.icon }</ListItemIcon>
                        :
                        null
                }
                {
                    listItem.text ? 
                        <ListItemText className={classes.text} primary={listItem.text} />
                        :
                        null
                }
                {
                    listItem.nestedItems ? 
                        open ? 
                            <ExpandLess /> 
                            : 
                            <ExpandMore />
                        :
                        null
                            
                }
            </ListItem>
        )
    }

    return (
        <React.Fragment>
            { 
                renderListItem(
                    listItem, 
                    idx, 
                    { 
                        className: `${classes.item} ${isCurrentItemSelected && !listItem.nestedItems ? classes.highlightedItem : ''} ${onSelectionChange ? classes.clickable : ''}`.trim(),
                        ...selectionClick
                    }
                ) 
            }
            {
                listItem.nestedItems ? 
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            { 
                                listItem.nestedItems.map((nestedListItem, index) => {

                                    const currentNestedItemIndex = selectedItemsIds.findIndex(selectedItemId => selectedItemId === nestedListItem.id);
                                    const isCurrentNestedItemSelected = currentNestedItemIndex > -1;

                                    let nestedSelectionClick = onSelectionChange ? { onClick: e =>  onSelectionChange(isCurrentNestedItemSelected, nestedListItem.id, currentNestedItemIndex)} : {};

                                    return renderListItem(nestedListItem, index, { ...nestedSelectionClick, className: `${classes.item} ${isCurrentNestedItemSelected ? classes.highlightedItem : ''} ${onSelectionChange ? classes.clickable : ''}`.trim() })
                                }) 
                            }
                        </List>
                    </Collapse>
                    :
                    null
            }
        </React.Fragment>
    )
};

const CollapsableList = props => {

    const classes = useStyles();

    const {
        listConfig=[],
        selectedItemsIds=[],
        onSelectionChange
    } = props;

    

    return (
        <List component="div" className={classes.root}>
            {
                listConfig.map((listItem, idx) => {

                    const currentItemIndex = selectedItemsIds.findIndex(selectedItemId => selectedItemId === listItem.id);
                    const isCurrentItemSelected = currentItemIndex > -1;
                    
                    return <CollapsableListItem key={idx} idx={idx} listItem={listItem} classes={classes} selectedItemsIds={selectedItemsIds} onSelectionChange={onSelectionChange} currentItemIndex={currentItemIndex} isCurrentItemSelected={isCurrentItemSelected} />
                })
            }
        </List>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        padding: 0,
        overflow: 'auto'
    },
    item: {
        padding: 20,
        minHeight: 60,
        maxHeight: 60,
        borderBottom: `1px solid ${theme.palette.border1}`
    },
    text: {
        "& .MuiTypography-root": {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }
    },
    highlightedItem: {
        background: `${theme.palette.highlight1} !important`
    },
    clickable: {
        cursor: 'pointer'
    }
}));

export default CollapsableList;