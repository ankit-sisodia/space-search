import React from 'react';
import { connect } from 'react-redux';

import ResultComponent from './ResultComponent';
import { resetSearch } from '../../store/actions';
import { getTime } from '../../helper';

const resultContainer = ({
    status, 
    foundPlanet,
    time,
    resetSearch
}) => (
    <ResultComponent 
        resetSearch={resetSearch}
        status={status} 
        time={time} 
        foundPlanet={foundPlanet} />
)

const mapStateToProps = ({ planets, vehicles, selectedPlanet, selectedVehicle, foundFalcone }) => {
    return {
        status: foundFalcone.status,
        foundPlanet: foundFalcone.planet,
        time: getTime(planets, vehicles, selectedPlanet, selectedVehicle)
    }
}

export default connect(mapStateToProps, {
    resetSearch
})(resultContainer);