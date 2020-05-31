import React, { memo } from 'react';
import className from 'classnames';
import './Select.scss';

const selectComponent = memo(({ planets = [], selectedPlanet, onChange, selectionId, selectedOption }) => {
    const getPlanetOptions = () => {
        let newOptions =  planets.filter(option => {
            let isValid = true;
            for(let key in selectedPlanet){
                if( selectedPlanet.hasOwnProperty(key) && parseInt(key) !== selectionId && option.value === selectedPlanet[key] ) isValid = false;
            }
            return isValid;
        });
        return newOptions;
    }
    const options = getPlanetOptions();

    return (
        <div className='select-container'>
            <label>{`Destination ${selectionId + 1}`}</label>
            <div className='custom-select-wrapper'>
                <select 
                    onChange={(e) => onChange({value: e.target.value, key: selectionId})}
                    value={ selectedOption || options[0].value } 
                    className={className("custom-select", {"placeholder": !selectedOption})}> {
                        options.map(option => <option
                        disabled={ option.disabled } 
                        className={option.disabled ? 'diabled-option custom-select-option': 'custom-select-option'} 
                        value={ option.value } 
                        key = { option.id }>{ option.label }</option>)
                    }
                </select>
            </div>
        </div>
    )}
);

export default selectComponent;