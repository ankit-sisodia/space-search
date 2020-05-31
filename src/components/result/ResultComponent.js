import React from 'react';
import { withRouter } from 'react-router-dom';

import './ResultComponent.scss';

const resultComponent = ({foundPlanet, status, time, history, resetSearch}) => (
    <>
        { status === 'success' ? <div className="found">
            <p>Congratulations on finding Falcone. King Shan is mighty pleased</p>
            <div className="found-data">
                <div className="found-time">Time taken: {time}</div>
                <div className="found-planet">Planet found: {foundPlanet}</div>
            </div>
        </div> : <div className="not-found">Couldn't find Falcone. King Shan is angry</div> }
        <button className='go-to-home-btn' onClick={() => {
                resetSearch();
                history.push('/');
            }}>Start Again!</button>    
    </>
);

export default withRouter(resultComponent);