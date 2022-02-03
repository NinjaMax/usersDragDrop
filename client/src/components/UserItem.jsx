
import React, { useState, useMemo} from 'react';
import PostService from '../API/PostService';

const UserItem = ({value}) => {
    const[usersPost, setUsersPost] = useState([]);
useMemo(() => {
    
    const getPost = PostService.getUserPost( function(response) {
        const userPost = response.data.filter(item => item.userId === value);
        setUsersPost(userPost);
      });
     
      return getPost;   
   
    },[value]);
 
   usersPost.filter(item => item.userId === value);
    

    return (
        
            <div className="modal-dialog modal-dialog-scrollable">
                {usersPost.map((item, index) =>{ return (
            <div key={index + 1}>Post {item.id} : {item.title}</div>)})}</div>
        
    );
};

export default UserItem;