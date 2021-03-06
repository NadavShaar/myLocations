import React, { useState, useEffect } from 'react';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { Avatar } from '../materialUI';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';

const CollapsableListItem = props => {

    const [open, setOpen] = useState(props.open);

    const { 
        selectedItemIndex,
        listItem,
        onSelectionChange,
        classes,
        selectedItemsIds,
        idx
    } = props;

    let selectionClick = onSelectionChange && !listItem.nestedItems ? { onClick: e =>  onSelectionChange(listItem.selected, listItem.id, selectedItemIndex)} : listItem.nestedItems ? { onClick: e => setOpen(!open)} : {};


    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const renderListItem = (listItem, idx, additionalProps) => {

        let isClickable = !!listItem.onClick || !!onSelectionChange;

        return (
            <ListItem key={idx} { ...additionalProps } button={isClickable}>
                {
                    listItem.icon ? 
                        !listItem.nestedItems ?
                            <Avatar className={classes.avatar}>
                                <ListItemIcon className={listItem.nestedItems ? classes.listItemIcon : classes.nestedListItemIcon}>{ listItem.icon }</ListItemIcon>
                            </Avatar>
                            :
                            <ListItemIcon className={listItem.nestedItems ? classes.listItemIcon : classes.nestedListItemIcon}>{ listItem.icon }</ListItemIcon>
                        :
                        null
                }
                {
                    listItem.text ? 
                        <ListItemText className={classes.text} primary={listItem.text} secondary={listItem.secondaryText} />
                        :
                        null
                }
                {
                    typeof listItem.hasSelection === 'boolean' ?
                        <span title="Has selected item" className={`${classes.hasSelectionDot} ${listItem.hasSelection ? classes.hasSelectionDotOn : classes.hasSelectionDotOff}`.trim()}></span>
                        :
                        null
                }
                {
                    listItem.helperText ? 
                        <ListItemIcon title={listItem.helperText} className={classes.helperIcon}><HelpIcon /></ListItemIcon>
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
                        className: `${classes.item} ${listItem.nestedItems ? classes.group : listItem.selected ? classes.highlightedItem : ''} ${onSelectionChange ? classes.clickable : ''}`.trim(),
                        ...selectionClick
                    }
                ) 
            }
            {
                listItem.nestedItems ? 
                    <Collapse className={classes.collapseContainer} in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            { 
                                listItem.nestedItems.map((nestedListItem, index) => {

                                    const selectedNestedItemIndex = selectedItemsIds.findIndex(selectedItemId => selectedItemId === nestedListItem.id);

                                    let nestedSelectionClick = onSelectionChange ? { onClick: e =>  onSelectionChange(nestedListItem.selected, nestedListItem.id, selectedNestedItemIndex)} : {};

                                    return renderListItem(nestedListItem, index, { ...nestedSelectionClick, className: `${classes.item} ${nestedListItem.selected ? classes.highlightedItem : ''} ${onSelectionChange ? classes.clickable : ''}`.trim() })
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

                    const selectedItemIndex = selectedItemsIds.findIndex(selectedItemId => selectedItemId === listItem.id);
                    
                    return (
                        <CollapsableListItem 
                            key={idx} 
                            idx={idx} 
                            open={!!listItem.open} 
                            listItem={listItem} 
                            classes={classes} 
                            selectedItemsIds={selectedItemsIds} 
                            onSelectionChange={onSelectionChange} 
                            selectedItemIndex={selectedItemIndex}
                        />
                    )
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
        padding: '0 20px',
        minHeight: 60,
        maxHeight: 60,
        borderBottom: `1px solid ${theme.palette.border1}`
    },
    avatar: {
        marginRight: 20
    },
    text: {
        marginRight: 40,
        "& .MuiTypography-root": {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        "& .MuiTypography-colorTextSecondary": {
            color: theme.palette.color5
        }
    },
    group: {
        backgroundColor: `${theme.palette.background7} !important`,
        color: theme.palette.color1
    },
    highlightedItem: {
        background: `${theme.palette.highlight1} !important`
    },
    clickable: {
        cursor: 'pointer'
    },
    collapseContainer: {
        maxHeight: 300,
        overflowY: 'auto'
    },
    hasSelectionDot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        cursor: 'help',
        marginRight: 15,
        transition: `background-color .15s ${theme.transitions.easing.easeInOut}`
    },
    hasSelectionDotOn: {
        backgroundColor: theme.palette.highlight1,
    },
    hasSelectionDotOff: {
        backgroundColor: 'transparent',
    },
    listItemIcon: {
        minWidth: 30,
        "& .MuiSvgIcon-root": {
            color: theme.palette.icon1,
            width: 20,
            height: 20
        }
    },
    nestedListItemIcon: {
        minWidth: 30,
        "& .MuiSvgIcon-root": {
            margin: '0 auto',
            color: theme.palette.primary.main,
            width: 20,
            height: 20
        }
    },
    helperIcon: {
        position: 'absolute',
        right: 20,
        minWidth: 'fit-content',
        color: theme.palette.icon5,
        cursor: 'help',
        "& svg": {
            fontSize: 18,
            pointerEvents: 'none'
        }
    }
}));

export default CollapsableList;