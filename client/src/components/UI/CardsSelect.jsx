import React from 'react';

const CardsSelect = ({options, defaultValue, value, onChange}) => {
    return (
        <div>
            <select 
                className="select" 
                data-mdb-filter="true"
                value={value}
                onChange={event =>onChange(event.target.value)}>
                <option disabled value="">{defaultValue}</option>
                {options.map((option, index) =>
                    <option value={option.value} key={index + 1}>{option.name}</option>
                
                    )}
            </select>
        </div>
    );
};

export default CardsSelect;