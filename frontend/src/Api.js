import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL ? `${process.env.REACT_APP_BASE_URL}api/posts` : 'http://localhost:5000/api/posts';
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

    static async addPost(post) {
        const res = await axios.post(`${BASE_URL}`, post);
        return res.data;
    }

    static async editPost(postId, post) {
        const res = await axios.put(`${BASE_URL}/${postId}`, post);
        return res.data;
    }

    static async deletePost(postId) {
        const res = await axios.delete(`${BASE_URL}/${postId}`);
        return res.data;
    }

    static async updateVote(postId, delta) {
        const res = await axios.post(`${BASE_URL}/${postId}/vote/${delta}`);
        return res.data;
    }
}

export default Api;