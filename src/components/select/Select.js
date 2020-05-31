import React, { memo, useState, useEffect, createRef } from 'react';
import className from 'classnames';
import './Select.scss';

const selectComponent = memo(({ planets = [], selectedPlanet, onChange, selectionId, selectedOption }) => {
    
    const [ isOpen, setIsOpen ] = useState(false);
    const [ options, setOptions ] = useState();

    const inputContainerEl = createRef();
    const inputEl = createRef();    

    useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    });

    useEffect(() => {
        isOpen && inputEl.current && inputEl.current.focus && inputEl.current.focus();
    });

    const getPlanetOptions = (e, shouldFilter) => {
        let newOptions =  planets.filter(option => {
            let isValid = true;
            for(let key in selectedPlanet){
                if( selectedPlanet.hasOwnProperty(key) && parseInt(key) !== selectionId && option.value === selectedPlanet[key] ) isValid = false;
            }

            if( shouldFilter && !option.value.toLowerCase().includes(e.target.value.toLowerCase()) ) isValid = false;

            return isValid;
        });
        return newOptions;
    }

    const closeDropdown = ({target}) => {
        if(inputContainerEl.current && target !== inputContainerEl.current && target !== inputEl.current) {
            setIsOpen(false);
            if(inputEl.current) inputEl.current.value = ''; 
            setOptions(getPlanetOptions());
        }
    }

    return (
        <div className='select-container'>
            <label>{`Destination ${selectionId + 1}`}</label>
            <div className={className('custom-select-wrapper', {'open-dropdown': isOpen})}>
                <div className="input-container" ref={inputContainerEl} onClick={() => setIsOpen(true)}>
                    { (!isOpen && !!selectedOption) && 
                        <div className={className("selected-value", { 'add-padding': !!selectedOption })} >{selectedOption}</div> }
                    { (isOpen || !selectedOption) && 
                        <input 
                            onClick={() => setOptions(getPlanetOptions())}
                            onKeyUp={e => setOptions(getPlanetOptions(e, true))} 
                            ref={inputEl} 
                            type="text" 
                            placeholder={!selectedOption ? "Select" : ''}
                        />
                    }
                </div>
                { isOpen && <ul className={className("custom-select")}> {
                        options.map(option => <li
                        onClick={e => { 
                            closeDropdown(e); 
                            onChange({value: option.value, key: selectionId});
                        }}
                        className={className('custom-select-option', {'selected-option': option.value === selectedOption})} 
                        value={ option.value } 
                        key = { option.id }>{ option.label }</li>)
                    }
                </ul> }
            </div>
        </div>
    )}
);

export default selectComponent;