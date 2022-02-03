import React from 'react';

const MyInput = ({children}) => {
    return (
        <form className='d-flex input-group w-auto'>
              <input type='text' 
              className='form-control' 
              placeholder={children} 
              aria-label='add' 
              onChange={e =>  e.target.value}
              />
            </form>
        
    );
};

export default MyInput;