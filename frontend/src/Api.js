import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/posts';
class Api {

    static async getPostTitles() {
        const res = await axios.get(`${BASE_URL}`);
        return res.data;
    }

    static async getPostDetail(postId) {
        const res = await axios.get(`${BASE_URL}/${postId}`);
        return res.data;
    }





}

export default Api;