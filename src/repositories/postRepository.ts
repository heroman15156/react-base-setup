import axios from "axios";

const fetchPosts = async () => {
  return await axios("https://jsonplaceholder.typicode.com/posts").then(
    (resp) => resp.data,
  );
};

export { fetchPosts };
