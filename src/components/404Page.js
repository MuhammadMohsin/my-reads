import React from 'react';
import { Link } from 'react-router-dom';

const DefaultComponent = () => {
    return (
        <div className="default-page-container">
            <Link
                to="/"
                className="back-home">
            </Link>
            <h2>404 Page not found!</h2>
        </div>
    )
}

export default DefaultComponent;