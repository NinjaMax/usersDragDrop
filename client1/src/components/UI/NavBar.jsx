/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import About from '../../pages/About';
import MyModal from './MyModal';
import axios from 'axios';
import MyModalLog from './MyModalLog';

const NavBar = () => {
  const [googleLog, setGoogleLog] = useState('');

    useEffect(() =>{
        async function getGoogleLog() {
            await axios
            .get("http://localhost:4000/auth/google/url", {
                        withCredentials: true,
            }).then((res) => setGoogleLog(res.data));
        }
        getGoogleLog();
    },[]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <a className="navbar-brand me-2" href="/">         
                    <img
                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                        height="16"
                        alt="MDB Logo"
                        loading="lazy"
                        style={{marginTop: '-1px'}}
                        />
                </a>
                <button         
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarButtonsExample">
               
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">          
                <li className="nav-item">
                <a className="nav-link" href="/">DragDrop User App</a>
                </li>
                  </ul>
                  <div className="d-flex align-items-center">
                  <a className="nav-link" href={<About/>}>About</a>
                    <button 
                    type="button" 
                    className="btn btn-link px-3 me-2"
                    data-mdb-toggle="modal" 
                    data-mdb-target="#ModalLog"
                    >           
                        Login / Sign up
                    </button>
                     <MyModal active="ModalLog" title="Log In">
                        {<MyModalLog/>}
                     </MyModal>

                    <div className='authModal' >
                      <a className="btn btn-primary" style={{backgroundColor: "#dd4b39"}} href={googleLog} role="button">
                        <i className="fab fa-google"></i>
                      </a>
                    </div>
                  </div>
                </div>
               
              </div>
             
            </nav>
           
        </div>        
    );
};

export default NavBar;