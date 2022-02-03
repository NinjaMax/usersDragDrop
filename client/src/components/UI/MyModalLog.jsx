import React from 'react';
import MyInput from './MyInput';

const MyModalLog = () => {

    return (
    <div>  
            <MyInput>
              {"введите еmail"}
            </MyInput>

            <MyInput>
              {"введите пароль"}
            </MyInput>
          
            
         <div className="modal-footer">
            <div>
                <button type="button" className="btn btn-primary" data-mdb-dismiss="modal">sign up</button>
            </div>

                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-mdb-dismiss="modal">Log In</button>

         </div>
    </div>
            
    

    );
};

export default MyModalLog;