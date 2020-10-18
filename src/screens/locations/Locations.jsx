import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Button, Toolbar, LinkButton, Checkbox, Select } from './../../components/materialUI';
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
    const [groupedByCategories, setGroupByCategories] = useState(false);
    const [sort, setSort] = useState(false);
    
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const buttonRef = useRef(null);
    
    let { locations, categories } = props;
    let categoriesArray = Object.keys(categories).map(categoryId => { return {id: categoryId, ...categories[categoryId]} });

    let filteredLocations = locations.filter(location => location.name.toLowerCase().includes(searchText.toLowerCase()) || location.categoriesIds.some(categoryId => !!categories[categoryId]?.name.toLowerCase().includes(searchText.toLowerCase()) ))

    const getSortedItems = (items) => {
        items = items.sort((a,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return sort === 'asc' ? 1 : -1;
            else if(a.name.toLowerCase() < b.name.toLowerCase()) return sort === 'asc' ? -1 : 1;
            return 0;
        })
        return items;
    }

    if(sort) {
        filteredLocations = getSortedItems(filteredLocations);
        categoriesArray = getSortedItems(categoriesArray);
    }

    let selectedLocation = selectedLocationIds.length === 1 && filteredLocations.find(loc => loc.id === selectedLocationIds[0]);


    const getListConfig = () => {
        if (!groupedByCategories) return filteredLocations.map(location => { return { id: location.id, text: location.name } });
        
        let categorizedList = categoriesArray.map(category => { 
            let nestedItems = filteredLocations.filter(loc => !!loc.categoriesIds.find(catId => category.id == catId)).map(location => { return { id: location.id, text: location.name } });
            
            return { 
                id: category.id, 
                text: category.name, 
                nestedItems,
                open: !!(searchText && nestedItems.length)
            } 
        });
        
        return categorizedList.filter(category => !!category.nestedItems.length);
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

    const renderGroupByCategories = () => (
        <Checkbox
            label="Group by categories"
            checked={groupedByCategories}
            onChange={e => setGroupByCategories(!groupedByCategories)}
        />
    )

    const renderSort = () => (
        <div className={classes.selectContainer}>
            <span className={classes.selectLabel}>Sort: </span>
            <Select
                value={sort}
                onSelectioChange={setSort}
                options={[
                    {label: 'Ascending', value: 'asc'},
                    {label: 'Descending', value: 'desc'},
                    {label: 'None', value: false},
                ]}
            />
        </div>
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
                        <div className={classes.bottomControlsContainer}>
                            { renderGroupByCategories() }
                            <span className={classes.bottomControlsSeperator}>|</span>
                            { renderSort() }
                        </div>
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
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    bottomControlsContainer: {
        display: 'flex',
        alignItems: 'center'
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
    },
    selectContainer: {
        display: 'flex', 
        alignItems: 'center', 
        flex: 1
    },
    selectLabel: {
        marginRight: 10, 
        fontSize: 14, 
        color: theme.palette.color3
    },
    bottomControlsSeperator: {
        marginRight: 20, 
        marginLeft: 4, 
        fontSize: 16, 
        color: theme.palette.color6
    }
}));

export default Locations;