import axios from "axios";
import type { Comment, Post } from "../type/Post.ts";
import { JSON_PLACEHOLDER_ENDPOINT } from "../constants/routes.tsx";

const getPosts = async () => {
  return axios
    .get<Post[]>(`${JSON_PLACEHOLDER_ENDPOINT}/posts}`)
    .then((resp) => resp.data);
};

const getPostById = (id: number) => {
  return axios
    .get<Post[]>(`${JSON_PLACEHOLDER_ENDPOINT}/posts/${id}`)
    .then((resp) => resp.data);
};

const getCommnets = () => {
  return axios
    .get<Comment[]>(`${JSON_PLACEHOLDER_ENDPOINT}/comments`)
    .then((resp) => resp.data);
};

const getCommentByPostId = (postId: number) => {
  return axios
    .get<Comment>(`${JSON_PLACEHOLDER_ENDPOINT}/posts/${postId}/comments`)
    .then((resp) => resp.data);
};

export { getPosts, getPostById, getCommentByPostId, getCommnets };
