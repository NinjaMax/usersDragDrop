import React from 'react';


const Modal = ({children, active, title}) => {


    return (
   
      <div className='modal fade' id={active} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
              <div className="modal-body">
              {children}
              </div>
            
          </div>
        </div>
      </div>

  
    );
};

export default Modal;