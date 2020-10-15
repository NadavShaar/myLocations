import React from 'react';
import { makeStyles } from '@material-ui/core';

const List = props => {

    const classes = useStyles();

    const {
         items=[],
         selectedItemsIds=[],
         onSelectionChange
    } = props;

    return (
        <div className={classes.itemsList}>
            { 
                items.map((item, idx) => {
                    
                    const currentItemIndex = selectedItemsIds.findIndex(selectedItemId => selectedItemId === item.id);
                    const isCurrentItemSelected = currentItemIndex > -1;

                    return (
                        <span 
                            key={idx} 
                            className={`${classes.item} ${isCurrentItemSelected ? classes.highlightedItem : ''}`.trim()} 
                            onClick={e => onSelectionChange(isCurrentItemSelected, item.id, currentItemIndex)}
                        >
                            {item.name}
                        </span>
                    )
                })
            }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    itemsList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'auto',
        height: '100%',
    },
    item: {
        cursor: 'pointer',
        background: theme.palette.background1,
        padding: 20,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minHeight: 60,
        maxHeight: 60,
        borderBottom: `1px solid ${theme.palette.border1}`,
        transition: `background .2s ${theme.transitions.easing.easeInOut}`,
        "&:hover": {
            backgroundColor: theme.palette.background3
        }
    },
    highlightedItem: {
        background: `${theme.palette.highlight1} !important`
    }
}));

export default List;