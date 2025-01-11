import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi'
import "../App.css";
import { Form } from './Form';

export const Posts = () => {

  const [data, setData]= useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

const getPostsData = async ()=>{
  const res = await getPost();
  console.log(res.data);
  setData(res.data);
};

useEffect(()=> {
  getPostsData();
},[]);

// function to delete
const handleDelete = async (id)=>{
  try{
    const res = await deletePost(id);
    console.log(`post with id ${id.id} deleted.`);
    console.log(data.length);
    if(res.status ===200){
      const newUpdatedPost = data.filter((currentPost) => {
        return currentPost.id !== id.id;
      });
      setData(newUpdatedPost);
     console.log(newUpdatedPost.length);
    } else{
      console.log("failed to delete the post:", res.status);
      
    }
  } catch(error){
    console.log(error); 
  }
};

 // handle update post
 const handleUpdatePost = (currentPost) => {
  setUpdateDataApi(currentPost.currentPost);
};
  return (
    <>
    <section className="section-form">
      <Form 
      data={data} 
      setData = {setData}
      updateDataApi={updateDataApi} 
      setUpdateDataApi={setUpdateDataApi}
      />
    </section>
    <section className="section-post">
      <ol>
        {
          data.map((currentPost)=>{
            const {id, body, title} = currentPost;

            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button className="btn-update"
                 onClick={()=> handleUpdatePost({currentPost})}>Edit</button>
                <button className="btn-delete" 
                onClick={() => handleDelete
                ({id})}>Delete</button>
              </li>
            );
          })
        }
      </ol>
    </section>
    </>
  )
}
