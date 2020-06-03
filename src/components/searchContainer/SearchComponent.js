import React from 'react';
import { withRouter } from 'react-router';

import SelectComponent from '../select';
import RadioComponent from '../radio';
import './SearchComponent.scss';
import { getTime } from '../../helper';

const searchComponent = props => {

    const { 
        findFalcone, 
        planets, 
        vehicles, 
        updateSelectedPlanet, 
        updateSelectedVehicle, 
        searches, 
        selectedPlanet,
        selectedVehicle,
        history
    } = props;
        
    const renderSelectComponent = () => {

        let count = 0;
        let compArr = [];

        while(count < searches) {
            compArr.push(<div key={count} className="module-wrapper">
                <SelectComponent 
                    selectionId={count} 
                    planets={planets} 
                    selectedPlanet={selectedPlanet}
                    selectedOption={selectedPlanet[count]} 
                    onChange={updateSelectedPlanet}
                />
                { selectedPlanet[count] && <RadioComponent 
                    selectionId={count}
                    selectedVehicles={selectedVehicle}
                    selectedPlanetOption={selectedPlanet[count]}
                    planets={planets}
                    selectedOption={selectedVehicle[count]} 
                    onChange={updateSelectedVehicle}
                    options={vehicles} />}
            </div> )
            count++;
        }
        return compArr;
    }

    return(
        <div className="content-wrapper">
            <h3>Select planets you want to search in:</h3>
            <div className='search-time-container'>
                <div className='search-wrapper'> { renderSelectComponent() }</div>
                <div className='time-section'>
                    Maximum Time: {getTime(planets, vehicles, selectedPlanet, selectedVehicle)}
                </div>
            </div>
            <button className='find-btn' onClick={() => findFalcone(history)}>Find Falcone!</button>    
        </div>
    );
}

export default withRouter(searchComponent);