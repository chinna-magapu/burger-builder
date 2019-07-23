import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6b394.firebaseio.com/'
});

export default instance;
