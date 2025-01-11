import React, { useEffect, useState } from 'react'
import { addPost, updateData } from '../api/PostApi';

export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
  const [addData, setAddData] = useState({
    title:"",
    body:"",
  });

  let isEmpty = Object.keys(updateDataApi).length ===0;
  useEffect(() => {
    console.log(updateDataApi);
    
    updateDataApi && 
    setAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body || "",
    });
  }, [updateDataApi]);

 const handleInputChange = (e) => {
    const name=e.target.name;
    const value = e.target.value;
    
    setAddData((prev) => {
      return {
        ... prev,
        [name]:value
      }; 
      
    });
 };

 const addPostData = async () => {
  const res = await addPost(addData);
  console.log("app post res", res.data);
  
  if(res.status === 201){
    setData([...data, res.data]);
    setAddData({title:"", body:""});
  }
  console.log(data.length);
  
 };
// updatePostData
const updatePostData = async () => {
  try {
    const res = await updateData(updateDataApi.id, addData);
    console.log(res);
    if(res.status===200)
    {
      setData((prev)=> {
      return prev.map((currel)=>{
          return currel.id ===res.data.id ? res.data : currel;
      });
    });
    setAddData({title:"",body:""});
    setUpdateDataApi({});
  }
  } catch(error){
    console.log(error);
    
  }
};

 const handleFormSubmit = (e)=>{
  e.preventDefault();
  const action = e.nativeEvent.submitter.value;
  if(action ==="Add")
  {addPostData();
  } else if(action ==="Edit"){
    updatePostData();
  }
 };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
         type="text"
         autoComplete="off"
         id="title"
         name="title"
         placeholder="add title"
         value={addData.title}
         onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
         type="text"
         autoComplete="off"
         id="body"
         name="body"
         placeholder="add Post"
         value={addData.body}
         onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add":"Edit"}>{isEmpty? "Add":"Edit"}</button>
    </form>
  )
}
