import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    findFalcone, 
    updateSelectedPlanet, 
    updateSelectedVehicle,
    fetchInitialData
} from '../../store/actions';
import SearchComponent from './SearchComponent';

class SearchContainer extends Component {
    
    componentDidMount() {
        const { fetchInitialData } = this.props;
        fetchInitialData();
    }


    render() {
        const { 
            searches,
            planets, 
            vehicles, 
            selectedPlanet, 
            selectedVehicle, 
            findFalcone,
            updateSelectedPlanet, 
            updateSelectedVehicle
        } = this.props;

        return(
           <SearchComponent 
                searches={searches}
                planets={planets} 
                vehicles={vehicles} 
                selectedPlanet={selectedPlanet} 
                selectedVehicle={selectedVehicle}
                findFalcone={findFalcone}
                updateSelectedPlanet={updateSelectedPlanet}
                updateSelectedVehicle={updateSelectedVehicle}
            />
        );
    }
}

const mapStateToProps = ({ planets, vehicles, selectedPlanet, selectedVehicle, searches}) => ({
    planets,
    vehicles,
    selectedPlanet,
    selectedVehicle,
    searches
});

export default connect( mapStateToProps, {
    fetchInitialData,
    findFalcone,
    updateSelectedPlanet,
    updateSelectedVehicle
} )(SearchContainer);