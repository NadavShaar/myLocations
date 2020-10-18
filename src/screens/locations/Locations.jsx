import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Button, Toolbar, LinkButton } from './../../components/materialUI';
import { deleteLocations } from './../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Search, CollapsableList } from './../../components/ui';

const Locations = props => {
    
    
    const [selectedLocationIds, setSelectedLocationsIds] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [groupedBy, setGroupedBy] = useState(null);
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    const { locations, categories } = props;

    let filteredLocations = locations.filter(location => location.name.toLowerCase().includes(searchText.toLowerCase()) || location.categoriesIds.some(categoryId => !!categories[categoryId]?.name.toLowerCase().includes(searchText.toLowerCase()) ))

    let selectedLocation = selectedLocationIds.length === 1 && filteredLocations.find(loc => loc.id === selectedLocationIds[0]);


    const getListConfig = () => {
        switch (groupedBy) {
            case 'categories': {
                let categorizedList = Object.keys(categories).map(categoryId => { 
                    let nestedItems = filteredLocations.filter(loc => !!loc.categoriesIds.find(catId => categoryId == catId)).map(location => { return { id: location.id, text: location.name } });
                    return { 
                        id: categoryId, 
                        text: categories[categoryId].name, 
                        nestedItems,
                        open: !!(searchText && nestedItems.length)
                    } 
                });
                
                return categorizedList.filter(category => !!category.nestedItems.length);
            }
            default: return filteredLocations.map(location => { return { id: location.id, text: location.name } })
        }
    }
    
    const selectLocation = (isCurrentLocationSelected, locationId, locationIndex) => {
        
        let selectedLocationIdsClone = [ ...selectedLocationIds ];

        if(isCurrentLocationSelected) selectedLocationIdsClone.splice(locationIndex, 1);
        else selectedLocationIdsClone.push(locationId);

        setSelectedLocationsIds(selectedLocationIdsClone); 
    }

    const removeLocation = () => {

        let isSingleLocation = selectedLocationIds.length === 1;

        const event = new CustomEvent('displayConfirm', {
            bubbles: true,
            detail: {
                description: `Are you sure you want to delete ${isSingleLocation ? selectedLocation.name : 'the selected locations'}?`,
                submitLabel: 'Delete',
                onSubmit: () => {
                    const event = new CustomEvent('displaySnackbar', {
                        bubbles: true,
                        detail: {
                            open: true, 
                            message: `${isSingleLocation ? selectedLocation.name : (selectedLocationIds.length + ' locations')} deleted successfully`, 
                            type: 'success',
                        }
                    });

                    dispatch(deleteLocations(selectedLocationIds));
            
                    setSelectedLocationsIds([]); 

                    buttonRef.current.dispatchEvent(event);
            
                }
            }
        });

        buttonRef.current.dispatchEvent(event);

    }

    const renderToolbar = () => (
        <Toolbar 
            title={`Locations${locations.length ? (' (' + locations.length + ')') : ''}`}
            buttons={
                selectedLocationIds.length ?
                    <React.Fragment>
                        <span className={classes.clearSelectionButton}><CloseIcon className={classes.icon} onClick={e => setSelectedLocationsIds([])} />{`${selectedLocationIds.length} selected`}</span>
                        {
                            selectedLocationIds.length === 1 ?
                                <React.Fragment>
                                    <LinkButton className={classes.button} to={`/locations/${selectedLocationIds}/edit`} startIcon={<EditIcon className={classes.icon} />}>EDIT</LinkButton>
                                    <LinkButton className={classes.button} to={`/locations/${selectedLocationIds}/details`} startIcon={<VisibilityIcon className={classes.icon} />}>VIEW DETAILS</LinkButton>
                                </React.Fragment>
                                :
                                null
                        }
                        <Button ref={buttonRef} className={classes.button} color="inherit" onClick={removeLocation} startIcon={<DeleteIcon className={classes.icon} />}>DELETE</Button>
                    </React.Fragment>
                    :
                    <LinkButton className={classes.button} to="/locations/new" startIcon={<AddIcon className={classes.icon} />}>NEW</LinkButton>
            }
        />
    )

    const renderSearch = () => (
        <Search 
            autoFocus={true}
            label="Search location or category"
            searchText={searchText}
            onSearchChange={setSearchText}
        />
    )

    const renderLocationsList = () => (
        <CollapsableList 
            listConfig={ getListConfig() }
            selectedItemsIds={selectedLocationIds}
            onSelectionChange={selectLocation}
        />
    )

    const renderNoResults = () => (
        <span className={classes.noResultsLabel}>No Locations</span>
    )

    return (
        <div className={classes.pageContainer}>
            { renderToolbar() }
            <div className={classes.contentContainer}>
                <div className={classes.locationsListContainer}>
                    <div className={classes.controlsContainer}>
                        { renderSearch() }
                    </div>
                    <div className={classes.locationsContainer}>
                        {
                            filteredLocations.length ?
                                renderLocationsList()
                                :
                                renderNoResults()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%'
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        height: 'calc(100% - 64px)',
        padding: 20,
        position: 'relative'
    },
    controlsContainer: {
        display: 'flex'
    },
    locationsListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
        maxHeight: 600,
        height: '100%'
    },
    locationsContainer: {
        width: '100%',
        height: 'calc(100% - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background1,
        boxShadow: theme.shadows[1],
        borderRadius: 4,
        overflow: 'hidden'
    },
    noResultsLabel: {
        fontSize: 36,
        color: theme.palette.color6,
        fontStyle: 'italic'
    },
    button: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        marginLeft: 10,
        color: theme.palette.color1
    },
    icon: {
        fontSize: 20
    },
    clearSelectionButton: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 8,
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        "& > svg": {
            cursor: 'pointer'
        }
    }
}));

export default Locations;