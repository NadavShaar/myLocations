import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar, ChipInput } from './../../components/materialUI';
import { BigInput, HistoryGoBackButton, PageNotFoundMessage } from './../../components/ui';
import Map from './../../components/map/Map';
import { addLocation, updateLocation } from './../../store/actions';
import { useParams } from "react-router-dom";

const Location = props => {
    
    const classes = useStyles();
    
    const dispatch = useDispatch(); 

    let { id } = useParams();
    
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    
    const categories = useSelector(state => state.categories) || {};
    const locations = useSelector(state => state.locations.data) || [];
    
    let locationIndex = locations.findIndex(location => location.id == id);
    const selectedLocation = locationIndex > -1 && useSelector(state => state.locations.data[locationIndex]);
    
    const [locationName, setLocationName] = useState(selectedLocation?.name || "");
    const [coords, setCoords] = useState(selectedLocation?.coords || [0,0]);
    const [address, setAddress] = useState(selectedLocation?.address || "");
    const [assignedCategories, setAssignedCategories] = useState(selectedLocation?.categoriesIds?.map?.(catId => {return { id: catId, name: categories[catId]?.name }}) || []);
    const { mode } = props;
    let dataIsMissing = mode !== 'new' && !id || mode !== 'new' && !selectedLocation;
    
    
    const createLocation = () => {
        if(!locationName) return;
        
        let successCondition = address && coords?.length === 2 && assignedCategories.length;
        if(successCondition) {
            dispatch(addLocation({id: Date.now(), name: locationName, address, coords, categoriesIds: assignedCategories.map(cat => cat.id)})); 
            setLocationName("");
            setAssignedCategories([]);
        }
        
        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: !coords.length === 2 || !address ?
                `Location cannot be found` 
                :
                !assignedCategories.length ? 
                `Select at least one category`
                :
                `${locationName} added successfully`, 
                type: successCondition ? 'success' : 'error'
            }
        });
        
        buttonRef.current.dispatchEvent(event);
        
        setTimeout(() => { inputRef?.current?.focus?.() }, 0);
    }
    
    const editLocation = () => {
        if(!locationName) return;
        let successCondition = address && coords?.length === 2 && assignedCategories.length;
        
        let currentLocation = locations[locationIndex];
        if(successCondition) dispatch(updateLocation({ ...currentLocation, name: locationName, address, coords, categoriesIds: assignedCategories.map(cat => cat.id) }));

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: !coords.length === 2 || !address ?
                    `Location cannot be found` 
                    :
                    !assignedCategories.length ? 
                        `Select at least one category`
                        :
                        `${locationName} saved successfully`, 
                type: successCondition ? 'success' : 'error'
            } 
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef?.current?.focus?.() }, 0);
    }

    const getTitleByMode = () => {
        switch (mode) {
            case 'new': return 'New location'
            case 'edit': return dataIsMissing ? 'Edit location' : `Edit location - ${selectedLocation.name}`
            case 'details': return dataIsMissing ? 'Details' : `Details - ${selectedLocation.name}`
            default: return null;
        }
    }

    const renderBigInput = ({callback, buttonChildren, disabled, title, hint, props}) => (
        <BigInput 
            title={title}
            hint={hint}
            inputRef={inputRef}
            buttonRef={buttonRef}
            value={locationName}
            callback={callback}
            buttonChildren={buttonChildren}
            onChange={setLocationName}
            disabledSubmit={disabled}
            { ...props }
        />
    )

    const renderChipInput = () => (
        <ChipInput 
            label='Select Categories'
            selectedOptions={assignedCategories}
            handleChange={setAssignedCategories}
            getFormattedSelectedOption={(option, value) => option.id === value.id}
            options={Object.keys(categories).map(key => { return { id: key, name: categories[key].name } })}
        />
    )

    const renderMap = () => (
        <div className={classes.mapContainer}>
            <Map 
                coords={coords}
                setCoords={setCoords}
                setAddress={setAddress}
            />
        </div>
    )

    const renderLocation = () => (
        <div className={classes.flexColumn}>
            <div className={classes.flexColumn}>
                <span className={classes.locationDetailsTitle}>Address:</span>
                <span className={classes.locationDetails}>{address}</span>
            </div>
            <div className={classes.flexColumn}>
                <span className={classes.locationDetailsTitle}>Coordinates:</span>
                <span className={classes.locationDetails}>{`Longitude: ${coords[0]}`}</span>
                <span className={classes.locationDetails}>{`Latitude: ${coords[1]}`}</span>
            </div>
        </div>
    )

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return (
                <div className={classes.mapInputsContainer}>
                    { renderMap() }
                    <div className={classes.inputsContainer}>
                        <div className={`${classes.flexColumn} ${classes.inputs}`}>
                            { renderChipInput() }
                            { 
                                renderBigInput({
                                    callback: createLocation, 
                                    buttonChildren: '+', 
                                    disabled: (!locationName), 
                                    title: 'Location name', 
                                    hint: 'Hint: you can also submit using the Enter key.',
                                })
                            } 
                        </div>
                        { renderLocation() }
                    </div>
                </div>
            )
            case 'edit': return (
                <div className={classes.mapInputsContainer}>
                    { renderMap() }
                    <div className={classes.inputsContainer}>
                        <div className={`${classes.flexColumn} ${classes.inputs}`}>
                            { renderChipInput() }
                            { 
                                renderBigInput({
                                    callback: editLocation, 
                                    buttonChildren: <React.Fragment>&#10003;</React.Fragment>, 
                                    disabled: !locationName, 
                                    title: 'Update location', 
                                    hint: 'Hint: you can also submit using the Enter key.'
                                })
                            } 
                        </div>
                        { renderLocation() }
                    </div>
                </div>
            )
            case 'details': return <div className={classes.paper}><span className={classes.detailType}>Location name:</span><span className={classes.locationName}>{locationName}</span></div>;
            default: return null;
        }
    }

    const renderToolbar = () => (
        <Toolbar 
            title={getTitleByMode()}
            buttons={ <HistoryGoBackButton /> }
        />
    )

    return (
        <div className={classes.pageContainer}>
            { renderToolbar() }
            <div className={classes.contentContainer}>
                { 
                    dataIsMissing ?
                        <PageNotFoundMessage />
                        :
                        renderContentByMode() 
                }
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
        flex: 1, 
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        overflow: 'auto'
    },
    locationName: {
        fontSize: 36,
        color: theme.palette.color6,
        padding: '10px 20px',
        textAlign: 'center'
    },
    paper: {
        display: 'inline-flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[1],
        background: theme.palette.background1,
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: 250
    },
    detailType: {
        fontSize: 14,
        padding: '7px 10px',
        fontStyle: 'italic',
        color: theme.palette.color1,
        fontWeight: 500,
        background: theme.palette.primary.main,
        backgroundImage: theme.palette.gradient1,
        borderBottom: `1px solid ${theme.palette.border1}` 
    },
    mapContainer: {
        minHeight: 350, 
        flex: 1, 
        zIndex: 0,
        width: '100%',
        padding: 5,
        backgroundColor: theme.palette.background1,
        borderRadius: 4,
        boxShadow: theme.shadows[1],
    },
    mapInputsContainer: {
        maxWidth: 1200,
        width: '100%',
        display: 'flex',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 40,
        maxWidth: 300,
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            flexDirection: 'row',
            maxWidth: 'unset',
            marginTop: 20,
            marginBottom: 10
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 30
        }
    },
    locationDetailsTitle: {
        padding: '3px 0', 
        color: theme.palette.primary.main, 
        fontSize: 16,
        marginTop: 10
    },
    locationDetails: {
        color: theme.palette.color3, 
        fontSize: 14
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputs: {
        maxWidth: 300,
        minWidth: 300,
        [theme.breakpoints.down('md')]: {
            flex: 1,
            maxWidth: 500,
            marginRight: 40
        },
        [theme.breakpoints.down('xs')]: {
            flex: 1,
            maxWidth: 'unset',
            marginRight: 0
        }
    }
}));

export default Location;