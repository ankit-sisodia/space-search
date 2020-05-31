import React from 'react';
import { connect } from 'react-redux';
import { resetSearch } from '../../store/actions';
import './Header.scss';

const header = ({resetSearch}) => (
    <div className = 'header-container'>
        <h3 className="header-text">Finding Falcone!</h3>
        <ul className="header-nav-btns">
            <li className="nav-btn reset-btn" onClick={resetSearch}>Reset</li>
            <li className="nav-btn geek-home-btn">GeekTrust Home</li>
        </ul>
    </div>
);

export default connect(null, {
    resetSearch
})(header);