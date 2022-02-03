import axios from 'axios';

export default class PostService {
    static async getAllusers(callData) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        callData(response);
      
    }

    static async getUserPost(callData) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        callData(response);
        
    }

}