import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar } from './../../components/materialUI';
import { BigInput, HistoryGoBackButton, PageNotFoundMessage } from './../../components/ui';
import { addLocation, updateLocation } from './../../store/actions';
import { useParams } from "react-router-dom";

const Location = props => {
    
    const classes = useStyles();
    
    const dispatch = useDispatch(); 

    let { id } = useParams();
    
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    
    const { mode, locations } = props;
    
    let locationIndex = locations.findIndex(location => location.id == id);
    const selectedLocation = locationIndex > -1 && useSelector(state => state.locations.data[locationIndex]);

    const [locationName, setLocationName] = useState(locationIndex > -1 ? selectedLocation?.name : "");
    let isLocationExist = !!locations.find(location => location.name === locationName);

    let dataIsMissing = mode !== 'new' && !id || mode !== 'new' && !selectedLocation;

    const createLocation = () => {
        if(!locationName) return;

        if(!isLocationExist) {
            dispatch(addLocation({id: Date.now(), name: locationName, address: '', coords: [], categories: []})); 
            setLocationName("");
        }

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isLocationExist ? `${locationName} is already exist` : `${locationName} added successfully`, 
                type: isLocationExist ? 'error' : 'success', 
            }
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const editLocation = () => {
        if(!locationName) return;

        let currentLocation = locations[locationIndex];
        if(!isLocationExist) dispatch(updateLocation({ ...currentLocation, name: locationName }));

        const event = new CustomEvent('displaySnackbar', {
            bubbles: true,
            detail: {
                open: true, 
                message: isLocationExist ? `${locationName} is already exist` : `${locationName} saved successfully`, 
                type: isLocationExist ? 'error' : 'success'
            } 
        });

        buttonRef.current.dispatchEvent(event);

        setTimeout(() => { inputRef.current.focus() }, 0);
    }

    const getTitleByMode = () => {
        switch (mode) {
            case 'new': return 'New location'
            case 'edit': return dataIsMissing ? 'Edit location' : `Edit location - ${selectedLocation.name}`
            case 'details': return dataIsMissing ? 'Details' : `Details - ${selectedLocation.name}`
            default: return null;
        }
    }

    const renderBigInput = ({callback, buttonChildren, disabled, title, hint}) => (
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
            textFieldProps={{autoFocus: true}}
        />
    )

    const renderContentByMode = () => {
        switch (mode) {
            case 'new': return renderBigInput({callback: createLocation, buttonChildren: '+', disabled: !locationName, title: 'Add new location', hint: 'Hint: you can also submit using the Enter key.'})
            case 'edit': return renderBigInput({callback: editLocation, buttonChildren: <React.Fragment>&#10003;</React.Fragment>, disabled: !locationName, title: 'Update location', hint: 'Hint: you can also submit using the Enter key.'})
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
                <div className={classes.inputWrapper}>
                    { 
                        dataIsMissing ?
                            <PageNotFoundMessage />
                            :
                            renderContentByMode() 
                    }
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
        flex: 1, 
        height: 'calc(100% - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    inputWrapper: {
        display: 'inline-flex'
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
    }
}));

export default Location;