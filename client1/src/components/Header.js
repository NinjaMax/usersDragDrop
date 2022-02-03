/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Header = () => {

  const [userGoogle, setUserGoogle] = useState('');
  
  useEffect(() =>{
      async function getUserGoogle() {
          await axios
          .get("http://localhost:4000/auth/user/google", {
                      withCredentials: true,
          }).then((res) => setUserGoogle(res.data));
      }
      getUserGoogle();
  },[]);

async function getUser() {
  try {
    const response = await axios.delete("http://localhost:4000/auth/logout");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          
          <ul className="navbar-nav">
         
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src= {!userGoogle.picture ?
                    "https://image.shutterstock.com/image-vector/blank-avatar-photo-icon-design-260nw-1682415103.jpg"
                    : userGoogle.picture }
                  className="rounded-circle"
                  height="22"
                  alt="Portrait of Avatar"
                  loading="lazy"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <a className="dropdown-item" onClick={getUser}>Logout</a>
                </li>
              </ul>
            </li>
            <div>{userGoogle.name}</div>
          </ul>
        </div>
    </nav>
    );
};

export default Header;