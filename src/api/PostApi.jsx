import axios from "axios";


const api = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com"
});

export const getPost = ()=>{
  return api.get("/posts");
};

// delete method
export const deletePost = (id)=> {
  return api.delete(`/posts/${id.id}`);
}

// post method
export const addPost = (post) =>{
  return api.post("/posts", post);
};

// put method
export const updateData = (id, post) => {
  return api.put(`/posts/${id}`,post);
};