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

    static async addComment(postId, text) {
        const res = await axios.post(`${BASE_URL}/${postId}/comments`,
                                    { text });
        return res.data;
    }

    static async deleteComment(postId, commentId) {
        const res = await axios.delete(`${BASE_URL}/${postId}/comments/${commentId}`);
        return res.data;
    }

    static async getComments(postId) {
        const res = await axios.get(`${BASE_URL}/${postId}/comments`);
        return res.data;
    }





}

export default Api;