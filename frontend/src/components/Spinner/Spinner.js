import React from 'react';
import MDSpinner from 'react-md-spinner';
import './assets/sass/styles.scss';

const Spinner = ({ loading = false }) => {
    return (
      loading && <div className="loader-spinner">
        <MDSpinner singleColor="#3483fa" size="80" />
      </div>
    );
};

export default Spinner;
