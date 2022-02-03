import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CardsList from '../pages/CardsList';
import About from '../pages/About.jsx';
import Error from '../pages/Error';


const AppRouter = () => {
    
    return (
        <Routes>
            <Route path ="/" element={<CardsList/>} />
            <Route path ="/About" element={<About/>} />
            <Route path="*" element={<Error/>}/>
            
        </Routes>
    );
};

export default AppRouter;