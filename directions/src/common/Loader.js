import React from 'react';
import DotLoader from "react-spinners/DotLoader";

export const Loader = ({ loading }) => {

    return (
        <div className="loader-wrap">
            <DotLoader
                loading={loading}
                color="#9c9c9c"
                size={80}
            />
        </div>
    );
};