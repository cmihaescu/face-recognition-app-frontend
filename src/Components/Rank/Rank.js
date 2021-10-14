import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) => {
    return (
        <div className=''>
            <div className='strokemeBlack center white f3'>
                {`${name}, your current entry count is... `}
            </div>
            <div className='strokeme center white f1'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;