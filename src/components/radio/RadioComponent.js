import React, { memo } from 'react';
import './RadioComponent.scss';

const radioComponent = memo(props => {

    const { 
        options = [], 
        onChange, 
        selectionId, 
        selectedOption, 
        selectedVehicles, 
        selectedPlanetOption, 
        planets
     } = props;

    const isOptionSelected = option => {
        return !!(option.name === selectedOption);
    }

    const isOptionDisabled = option => {
        let isDisabled = false;
        let count = option['total_no'];
        for(let key in selectedVehicles) {
            if(selectedVehicles[key] === option.name) {
                count--;
            }
        }
        if( count === 0 && option.name !== selectedOption ) {
            isDisabled = true;
        }
        const currentPlanet = planets.find(planet => planet.value === selectedPlanetOption);
        if( currentPlanet && currentPlanet.distance > option['max_distance'] ) {
            isDisabled = true;
        }
        return isDisabled;
    }

    const getCount = option => {
        let count = option['total_no'];
        for(let key in selectedVehicles) {
            if(selectedVehicles[key] === option.name) {
                count--;
            }
        }
        return count;
    }
    
    return(
        <div className="vehicles-container">
            {options.map(option => (
                <div key={option.id} className="vehicle-select">
                    <input 
                        checked={isOptionSelected(option)}
                        type="radio" 
                        onChange={({target: {value}}) => onChange({value, key: selectionId})} 
                        value={option.name} 
                        disabled={isOptionDisabled(option)}
                        name={`vehicle-${selectionId}`} />
                    <label>{`${option.name} (${getCount(option)})`}</label>
                </div>
            ))}
        </div>);
    });

export default radioComponent;