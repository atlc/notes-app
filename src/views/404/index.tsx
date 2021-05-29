import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    return (
        <h1 className="text-danger">
            404, path {location.pathname} not found.
        </h1>
    )
}

export default NotFound;